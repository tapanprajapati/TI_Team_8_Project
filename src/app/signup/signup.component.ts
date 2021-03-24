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
}
