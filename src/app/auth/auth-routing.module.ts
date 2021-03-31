import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APP_TITLES } from '@core/const/app.const';

import { LoginComponent } from './login.component';

const routes: Routes = [{ path: 'login', component: LoginComponent, data: { title: APP_TITLES?.login } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
