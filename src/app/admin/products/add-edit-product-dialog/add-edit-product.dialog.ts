import { ProductModel } from '@core/model/product.model';
import { AdminProductService } from './../../services/admin-product.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { GlobalErrorService } from '@app/@core/services/global-error.service';
import { untilDestroyed } from '@app/@core';
import { ApiResponseModel } from '@app/@core/model/api-response.model';
import { CategoryModel } from '@app/@core/model/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface DonateProduct {
  id: number;
  productName: string;
  category: string;
  quantity: number;
}
@Component({
  selector: 'app-admin-add-edit-product',
  templateUrl: './add-edit-product.dialog.html',
  styleUrls: ['./add-edit-product.dialog.scss'],
})
export class AdminAddEditProductDialog implements OnInit, OnDestroy {
  public product: ProductModel;
  public isLoading = true;
  public categories: CategoryModel[];
  public productFormGroup: FormGroup;
  public buttonName = 'Add';
  public imageUrl: string;
  public imageFile: any;
  public saveButtonStatus = false;

  constructor(
    public dialog: MatDialog,
    private _ProductService: AdminProductService,
    private _globalErrorService: GlobalErrorService,
    private dialogRef: MatDialogRef<AdminAddEditProductDialog>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}
  ngOnDestroy(): void {}

  ngOnInit() {
    this._createForm();
    this._getAllCategories();
    if (this.data != null) {
      this._getProduct(this.data);
      this.buttonName = 'Edit';
    } else {
      this.showLoader(false);
    }
  }

  public preview(event: any) {
    this.imageFile = event.target.files[0];

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      this.saveButtonStatus = true;
    };
    reader.readAsDataURL(this.imageFile);
  }

  public saveImage(id: number) {
    if (this.imageFile == null) {
      this._ProductService.deleteImage(id);
    } else {
      this.showLoader(true);
      this._ProductService
        .uploadImage(id, this.imageFile)
        .percentageChanges()
        .subscribe((data) => {
          if (data == 100) {
            this.showLoader(false);
          }
        });
    }
    this.saveButtonStatus = false;
  }

  public save() {
    this.showLoader(true);
    if (this.data == null) {
      //create new product
      this._ProductService
        .addProduct(this.getObjectForAPI())
        .pipe(untilDestroyed(this))
        .subscribe(
          (res: any) => {
            this.product = {
              id: res.result.insertId,
              availableQuantity: 0,
              category: { id: 0, name: '' },
              description: '',
              imagePath: null,
              limit: 0,
              name: '',
            };
            this.saveImage(res.result.insertId);
            this.showLoader(false);
            this.dialogRef.close(this.createDonateData());
          },
          (err) => {
            this._globalErrorService.reactToAppError(err);
            this.dialogRef.close(false);
          }
        );
    } else {
      this._ProductService
        .updateProductById(this.data, this.getObjectForAPI())
        .pipe(untilDestroyed(this))
        .subscribe(
          (res: ApiResponseModel) => {
            this.showLoader(false);
            this.dialogRef.close(this.createDonateData());
          },
          (err) => {
            this._globalErrorService.reactToAppError(err);
            this.dialogRef.close(false);
          }
        );
    }
  }

  public close() {
    this.dialogRef.close(null);
  }

  private _getProduct(id: number) {
    this._ProductService.getProductDetails(id.toString()).subscribe((res) => {
      this.product = res['items'][0] as ProductModel;
      this.fetchProductImage(this.product);
      this.setFormData();
      this.showLoader(false);
    });
  }
  private _getAllCategories() {
    this._ProductService
      .getAllCategories()
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: ApiResponseModel) => {
          this.categories = res.items as CategoryModel[];
        },
        (err) => {
          this._globalErrorService.reactToAppError(err);
        }
      );
  }

  private fetchProductImage(product: ProductModel) {
    this._ProductService.fetchProductImage(product.id).subscribe((url) => {
      this.imageUrl = url;
    });
  }

  private showLoader(value: boolean) {
    this.isLoading = value;
  }

  get name() {
    return this.productFormGroup.controls.name;
  }

  get category() {
    return this.productFormGroup.controls.category;
  }

  get description() {
    return this.productFormGroup.controls.description;
  }

  get quantity() {
    return this.productFormGroup.controls.quantity;
  }

  get limit() {
    return this.productFormGroup.controls.limit;
  }

  private _createForm() {
    this.productFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: [''],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      limit: ['1'],
    });
  }

  private setFormData() {
    this.productFormGroup.controls.name.setValue(this.product.name);
    this.productFormGroup.controls.description.setValue(this.product.description);
    this.productFormGroup.controls.quantity.setValue(this.product.availableQuantity);
    this.productFormGroup.controls.limit.setValue(this.product.limit);
    this.productFormGroup.controls.category.setValue(this.product.category.id);
  }

  private getObjectForAPI(): any {
    return {
      name: this.productFormGroup.controls.name.value,
      desc: this.productFormGroup.controls.description.value,
      categoryId: this.productFormGroup.controls.category.value,
      availableQty: this.productFormGroup.controls.quantity.value,
      limit: this.productFormGroup.controls.limit.value,
    };
  }
  private createDonateData(): any {
    return {
      productName: this.productFormGroup.controls.name.value,
      category: this.productFormGroup.controls.category.value,
      quantity: this.productFormGroup.controls.quantity.value,
    };
  }
}
