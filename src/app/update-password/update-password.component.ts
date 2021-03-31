import { UpdatePasswordService } from './update-password.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from '@app/@core';
import { GlobalErrorService } from '@app/@core/services/global-error.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '@app/@shared';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
  updatePasswordForm!: FormGroup;
  isPasswordUpdated = false;
  token: string;
  email: string;
  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };

  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private _UpdatePasswordService: UpdatePasswordService,
    private _globalErrorService: GlobalErrorService,
    private _matDialog: MatDialog,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._updatePasswordForm();
  }

  ngOnInit() {
    this._route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      this.token = params.token;
      this.getBannerId();
    });
  }

  getBannerId() {
    this._UpdatePasswordService.convertToken(this.token).subscribe(
      (data) => {
        if (data.success) {
          this.email = data.items.email;
          console.log(this.email);

          this.validateToken();
        }
      },
      (error) => {
        console.log('Invalid Token');
        const dialogConfig = this._matDialogConfig;
        dialogConfig.data = { header: 'Failure!', content: 'Invalid Token.' };

        this._matDialog.open(MatDialogWrapperComponent, dialogConfig);

        this._matDialog.afterAllClosed.subscribe((data) => {
          console.log('Redirecting to Login');
          this._router.navigate(['/login']);
        });
        this._globalErrorService.reactToAppError(error);
      }
    );
  }

  validateToken() {
    this._UpdatePasswordService.getToken(this.email).subscribe((data) => {
      if (data.items[0].token == null) {
        const dialogConfig = this._matDialogConfig;
        dialogConfig.data = { header: 'Failure!', content: 'Token Expired.' };

        this._matDialog.open(MatDialogWrapperComponent, dialogConfig);

        this._matDialog.afterAllClosed.subscribe((data) => {
          console.log('Redirecting to Login');
          this._router.navigate(['/login']);
        });
      }
    });
  }
  ngOnDestroy() {}

  updatePassword() {
    this.isPasswordUpdated = true;
    this._UpdatePasswordService
      .updatePassword(this.email, this.updatePasswordForm.controls['password'].value)
      .subscribe((data) => {
        if (data.success) {
          const dialogConfig = this._matDialogConfig;
          dialogConfig.data = { header: 'Congratulations!', content: 'Your Password Has Been Updated Successfully.' };

          this._matDialog.open(MatDialogWrapperComponent, dialogConfig);

          this._matDialog.afterAllClosed.subscribe((data) => {
            console.log('Redirecting to Login');
            this._router.navigate(['/login']);
          });

          this.removeToken();
        }
      });
  }

  removeToken() {
    this._UpdatePasswordService.removeToken(this.email).subscribe((data) => {
      if (data.success) {
        console.log('Token Removed For User: ' + this.email);
      } else {
        console.log('Error Removing Token for User: ' + this.email);
      }
    });
  }

  matchPassword() {
    return (formGroup: FormGroup) => {
      let password = formGroup.controls['password'];
      let confirm_password = formGroup.controls['confirm_password'];
      if (password.value != confirm_password.value) {
        confirm_password.setErrors({ confirmedValidator: true });
      }
    };
  }

  get password() {
    return this.updatePasswordForm.controls.password;
  }
  get confirm_password() {
    return this.updatePasswordForm.controls.confirm_password;
  }
  private _updatePasswordForm() {
    this.updatePasswordForm = this.formBuilder.group(
      {
        password: [
          '',
          [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')],
        ],
        confirm_password: ['', Validators.required],
      },
      {
        validators: this.matchPassword(),
      }
    );
  }
}
