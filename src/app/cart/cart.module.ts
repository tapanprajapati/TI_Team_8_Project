import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CartComponent } from './cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule, FontAwesomeModule, CartRoutingModule],
  declarations: [CartComponent, CartItemComponent],
  providers: [],
})
export class CartModule {}
