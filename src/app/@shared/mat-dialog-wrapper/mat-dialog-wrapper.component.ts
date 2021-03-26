import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog-wrapper',
  templateUrl: './mat-dialog-wrapper.component.html',
  styleUrls: ['./mat-dialog-wrapper.component.scss'],
})
export class MatDialogWrapperComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
