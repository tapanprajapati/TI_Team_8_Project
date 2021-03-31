import { ForgotPasswordSerice } from './forogt-password.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '@shared/mat-dialog-wrapper/mat-dialog-wrapper.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  resetPasswordForm!: FormGroup;
  isResetPwdLinkSent = false;

  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private _ForgotPasswordSerice: ForgotPasswordSerice,
    private _matDialog: MatDialog
  ) {
    this._resetPasswordForm();
  }
  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };

  ngOnInit() {}

  ngOnDestroy() {}

  resetPasswordLink() {
    if (this.resetPasswordForm.valid) {
      this._ForgotPasswordSerice.resetPassword(this.resetPasswordForm.value).subscribe(
        (res) => {
          this.resetPasswordForm.reset();
          this.isResetPwdLinkSent = true;
        },
        (error) => {
          console.log(error.status);
          console.log(error.statusCode);
          this.resetPasswordForm.reset();
          this.isResetPwdLinkSent = false;
          const dialogConfig = this._matDialogConfig;
          if (error.error.message) {
            dialogConfig.data = { header: 'Failure!', content: error.error.message };
          } else {
            dialogConfig.data = { header: 'Resource Error!', content: 'Please try after some time.' };
          }
          this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
        }
      );

      // return this._http.post<any>(`${environment.serverUrl}resetpassword`, this.resetPasswordForm.value);
    }
  }

  get email() {
    return this.resetPasswordForm.controls.email;
  }

  private _resetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }
}
