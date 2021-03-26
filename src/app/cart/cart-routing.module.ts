import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APP_TITLES } from '@core/const/app.const';

import { CartComponent } from './cart.component';

const routes: Routes = [{ path: '', component: CartComponent, data: { title: APP_TITLES?.cart } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CartRoutingModule {}
