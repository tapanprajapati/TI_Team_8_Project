import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APP_TITLES } from '@core/const/app.const';

import { PolicyComponent } from './policy.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';

const routes: Routes = [
  {
    path: '',
    component: PolicyComponent,
    children: [
      { path: 'privacy', component: PrivacyComponent, data: { title: APP_TITLES?.privacy } },
      { path: 'terms', component: TermsConditionComponent, data: { title: APP_TITLES?.terms } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PolicyRoutingModule {}
