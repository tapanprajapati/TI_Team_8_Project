/*
 * @author Tapan Prajapati <Tapan.Prajapati@dal.ca>
 */

import { ProductModel } from '@core/model/product.model';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-delete-product',
  templateUrl: './delete-product-dialog.html',
  styleUrls: ['./delete-product-dialog.scss'],
})
export class AdminDeleteProductDialog implements OnInit, OnDestroy {
  public product: ProductModel;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AdminDeleteProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.product = this.data;
  }

  delete() {
    this.dialogRef.close(true);
  }
}
