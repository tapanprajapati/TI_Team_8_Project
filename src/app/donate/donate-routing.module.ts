import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APP_TITLES } from '@core/const/app.const';

import { DonateComponent } from './donate.component';

const routes: Routes = [{ path: '', component: DonateComponent, data: { title: APP_TITLES?.donate } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonateRoutingModule {}
