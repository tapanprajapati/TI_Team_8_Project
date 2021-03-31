import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APP_TITLES } from '@core/const/app.const';

import { ContactComponent } from './contact.component';
import { ItemRequestComponent } from './item-request/item-request.component';

const routes: Routes = [
  { path: '', component: ContactComponent, data: { title: APP_TITLES?.contact } },
  { path: 'special-item', component: ItemRequestComponent, data: { title: APP_TITLES?.special_item } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ContactRoutingModule {}
