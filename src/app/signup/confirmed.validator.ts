import { FormGroup } from '@angular/forms';

// This validator is used for the password and confirm password validation

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
  };
}
