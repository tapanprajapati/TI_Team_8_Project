import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { AdminOrdersComponent } from './orders/orders.component';
import { AdminDonationsComponent } from './donations/donations.component';
import { AdminProductsComponent } from './products/products.component';

import { AdminOrderService } from './services/admin-order.service';
import { SharedModule } from '@app/@shared/shared.module';
import { AdminOrderDetailsDialogComponent } from './orders/order-details-dialog/order-details-dialog.component';
import { AdminAddEditProductDialog } from './products/add-edit-product-dialog/add-edit-product.dialog';
import { AdminDeleteProductDialog } from './products/delete-product-dialog/delete-product-dialog';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AdminComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    AdminDonationsComponent,
    AdminAddEditProductDialog,
    AdminDeleteProductDialog,
  ],
  providers: [AdminOrderService],
})
export class AdminModule {}
