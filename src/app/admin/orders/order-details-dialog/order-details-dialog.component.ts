/*
 * @author Tapan Prajapati <Tapan.Prajapati@dal.ca>
 */

import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AdminOrderService } from '../../services/admin-order.service';
import { GlobalErrorService } from '@app/@core/services/global-error.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { untilDestroyed } from '@app/@core/services/until-destroyed';
import { ApiResponseModel } from '@app/@core/model/api-response.model';
import { OrderDetailModel, item } from '@app/@core/model/order.model';
import { FormControl } from '@angular/forms';
import { ProductService } from '@app/products/product.service';

@Component({
  selector: 'app-admin-order-detail-dialog',
  templateUrl: './order-details-dialog.html',
  styleUrls: ['./order-details-dialog.scss'],
})
export class AdminOrderDetailsDialogComponent implements OnInit, OnDestroy {
  isLoading = true;
  order: OrderDetailModel;
  orderStatusControl = new FormControl();

  constructor(
    private _adminOrderService: AdminOrderService,
    private _globalErrorService: GlobalErrorService,
    private _productService: ProductService,
    private dialogRef: MatDialogRef<AdminOrderDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: number
  ) {
    this.getOrderDetails(data);
  }

  getOrderDetails(orderId: number) {
    this._adminOrderService
      .getOrderDetails(orderId)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: ApiResponseModel) => {
          this.order = res.items as OrderDetailModel;
          this.fetchItemsImage(this.order.item);
          this.orderStatusControl.setValue(this.order.status);
          this._showLoader(false);
        },
        (err) => {
          this._globalErrorService.reactToAppError(err);
          this._showLoader(false);
        }
      );
  }

  fetchItemsImage(items: item[]) {
    items.forEach((item) => {
      item.imagePath = this._productService.fetchProductImage(item.ItemId);
    });
  }

  changeOrderStatus(isOpen: boolean) {
    const status = this.orderStatusControl.value;
    this._showLoader(true);

    this._adminOrderService
      .setOrderStatus(this.order.orderId, status)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: ApiResponseModel) => {
          this._showLoader(false);
        },
        (err) => {
          this._globalErrorService.reactToAppError(err);
        }
      );
    if (status == 'delivered') {
      this._adminOrderService.setOrderDelivered(this.order.orderId).subscribe(
        (res: ApiResponseModel) => {
          if (res.success) {
            this.order.DeliveredDate = new Date();
          }
        },
        (err) => {
          this._globalErrorService.reactToAppError(err);
        }
      );
    }
  }

  ngOnDestroy(): void {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }

  private _showLoader(val: boolean) {
    this.isLoading = val;
  }
}
