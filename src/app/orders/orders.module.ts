/**
 * @author Malav Jani <ml805403@dal.ca>
 *
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { OrdersRoutingModule } from './orders-routing.module';

import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  imports: [CommonModule, MaterialModule, OrdersRoutingModule],
  declarations: [OrdersComponent, OrderDetailsComponent],
  providers: [],
})
export class OrdersModule {}
