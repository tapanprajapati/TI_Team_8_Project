import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APP_TITLES } from '@core/const/app.const';

import { ProfileComponent } from './profile/profile.component';
import { AuthenticationGuard } from './../auth/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: { title: APP_TITLES?.profile },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class UserRoutingModule {}
