/**
 *
 *
 */
import { ContactService } from './contact.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ContactUsModel } from '@app/@core/model/contactUs.model';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '@shared/mat-dialog-wrapper/mat-dialog-wrapper.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactUsForm: FormGroup;
  contactUsModel: ContactUsModel[];

  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };

  constructor(
    private contactUs_service: ContactService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {
    this._createContactUsForm();
  }

  submit() {
    try {
      if (this.contactUsForm.valid) {
        this.contactUs_service.postMessage(this.contactUsForm.value).subscribe(
          (res) => {
            const dialogConfig = this._matDialogConfig;
            dialogConfig.data = { header: 'Success!', content: 'Message added successfully.' };
            this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
            this.router.navigate(['/home']);
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

  get firstName() {
    return this.contactUsForm.controls.firstName;
  }
  get email() {
    return this.contactUsForm.controls.email;
  }
  get message() {
    return this.contactUsForm.controls.message;
  }

  private _createContactUsForm() {
    this.contactUsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }
}
