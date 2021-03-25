import { Router } from '@angular/router';
import { PickupService } from './pickup.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAddEditProductDialog } from './../admin/products/add-edit-product-dialog/add-edit-product.dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '@shared/mat-dialog-wrapper/mat-dialog-wrapper.component';

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export interface DonateProduct {
  id: number;
  productName: string;
  category: string;
  quantity: number;
}     

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss'],
})
export class PickupComponent implements OnInit {
  pickupForm: FormGroup;
  public _Products: DonateProduct[] = [];
  displayedColumns: string[] = ['name', 'category', 'quantity'];
  @ViewChild('productsPaginator') paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<DonateProduct>;
  currentDate = new Date();
  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };

  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public Successdialog: MatDialog,
    private pickup_service: PickupService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._initializeDataGrid();
    this._createPickupForm();
  }

  private _initializeDataGrid() {
    this.dataSource = new MatTableDataSource<DonateProduct>(this._Products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AdminAddEditProductDialog, {
      width: '90vw',
      height: 'max-content',
    });

    dialogRef.afterClosed().subscribe((result) => {
      const dialogConfig = this._matDialogConfig;
      if (result != null) {
        this._Products.push(result);
        this._initializeDataGrid();
        dialogConfig.data = { header: 'Success!', content: 'Product added successfully.' };
        this.Successdialog.open(MatDialogWrapperComponent, dialogConfig);
      } else if (result == null) {
      } else {
        dialogConfig.data = { header: 'OOPS!', content: 'Something went wrong' };
        this.Successdialog.open(MatDialogWrapperComponent, dialogConfig);
      }
    });
  }
  pickup() {
    try {
      if (this.pickupForm.valid) {
        // Call service to add the user
        this.pickup_service.addRequest(this.pickupForm.value).subscribe(
          (res) => {
            const dialogConfig = this._matDialogConfig;
            dialogConfig.data = { header: 'Success!', content: 'Request Posted successfully.' };
            this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
            this._router.navigate(['/home']);
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
  get phone() {
    return this.pickupForm.controls.phone;
  }
  get zipcode() {
    return this.pickupForm.controls.zipcode;
  }
  get address1() {
    return this.pickupForm.controls.address1;
  }
  get address2() {
    return this.pickupForm.controls.address2;
  }
  get name() {
    return this.pickupForm.controls.name;
  }
  get pickupslot() {
    return this.pickupForm.controls.pickupslot;
  }
  get pickupTime() {
    return this.pickupForm.controls.pickupTime;
  }
  private _createPickupForm() {
    this.pickupForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('^([0-9]){10}$')]],
      name: [''],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      zipcode: ['', Validators.required],
      pickupslot: ['', Validators.required],
      pickupTime: ['', [Validators.required, Validators.min(9), Validators.max(18)]],
    });
  }
}
