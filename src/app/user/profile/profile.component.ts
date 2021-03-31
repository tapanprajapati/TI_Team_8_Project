import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { UserService } from './../user.service';
import { AuthenticationService } from '@app/auth';
import { GlobalErrorService } from '@core/services/global-error.service';
import { untilDestroyed } from '@app/@core';
import { UserModel } from '@core/model/user.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '@app/@shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: UserModel;
  profileForm: FormGroup;

  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };

  constructor(
    private _userService: UserService,
    private _authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private _matDialog: MatDialog,
    private _globalErrorService: GlobalErrorService
  ) {}

  ngOnInit() {
    this.getUser();
    this._createProfileForm();
  }

  ngOnDestroy() {}

  getUser() {
    this._userService
      .getUser(this._authenticationService.authUserEmail)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          this.user = res?.items;
          this.phone.setValue(this.user.phone);
          this.firstName.setValue(this.user.firstname);
          this.lastName.setValue(this.user.lastname);
          this.email.setValue(this.user.email);
        },
        (err) => {
          this._globalErrorService.reactToAppError(err);
        }
      );
  }

  updateProfile() {
    this._userService
      .updateUser(this.profileForm.value, this._authenticationService.authUserEmail)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          if (res?.success && res?.result?.affectedRows === 1) {
            const dialogConfig = this._matDialogConfig;
            dialogConfig.data = { header: 'Success!', content: 'Profile updated successfully!' };
            this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
          }
        },
        (err) => {
          this._globalErrorService.reactToAppError(err);
        }
      );
  }

  get phone() {
    return this.profileForm.controls.phone;
  }
  get firstName() {
    return this.profileForm.controls.firstName;
  }
  get lastName() {
    return this.profileForm.controls.lastName;
  }
  get email() {
    return this.profileForm.controls.email;
  }

  private _createProfileForm() {
    this.profileForm = this.formBuilder.group({
      phone: [{ value: '', disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
