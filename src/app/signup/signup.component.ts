import { UserModel } from './../@core/model/user.model';
import { RoleModel } from './../@core/model/role.model';
import { SignupService } from './signup.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '@shared/mat-dialog-wrapper/mat-dialog-wrapper.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  roles: RoleModel[];
  User: UserModel;
  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };
  constructor(
    private Signup_Service: SignupService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {
    this._createSignupForm();
    this.loadRoles();
  }
  ngOnDestroy() {}
  signup() {
    try {
      if (this.signupForm.valid) {
        // Call service to add the user
        this.Signup_Service.addUser(this.signupForm.value).subscribe(
          (res) => {
            const dialogConfig = this._matDialogConfig;
            dialogConfig.data = { header: 'Success!', content: 'User added successfully.' };
            this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
            this.router.navigate(['/login']);
          },
          (error) => {
            const dialogConfig = this._matDialogConfig;
            if (error.error.message) {
              dialogConfig.data = { header: 'Failure!', content: error.error.message };
            } else {
              dialogConfig.data = { header: 'Resource Error!', content: 'Please try after some time.' };
            }
            this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
          }
        );
      }
    } catch (e) {
      const dialogConfig = this._matDialogConfig;
      dialogConfig.data = { header: 'Failure!', content: 'Error Occured.' };
      this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
    }
  }

  loadRoles() {
    this.roles = this.Signup_Service.getAllroles();
  }

  get phone() {
    return this.signupForm.controls.phone;
  }
  get firstName() {
    return this.signupForm.controls.firstName;
  }
  get lastName() {
    return this.signupForm.controls.lastName;
  }
  get email() {
    return this.signupForm.controls.email;
  }
  get password() {
    return this.signupForm.controls.password;
  }
  get role() {
    return this.signupForm.controls.role;
  }
  get confirm_password() {
    return this.signupForm.controls.confirm_password;
  }

  private _createSignupForm() {
    this.signupForm = this.formBuilder.group(
      {
        phone: ['', [Validators.required, Validators.pattern('^([0-9]){10}$')]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')],
        ],
        confirm_password: ['', Validators.required],
        role: ['', Validators.required],
      },
      {
        validator: ConfirmedValidator('password', 'confirm_password'),
      }
    );
  }
}
