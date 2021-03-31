import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyRoutingModule } from './policy-routing.module';

import { PolicyComponent } from './policy.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';

@NgModule({
  imports: [CommonModule, PolicyRoutingModule],
  declarations: [PolicyComponent, PrivacyComponent, TermsConditionComponent],
  providers: [],
})
export class PolicyModule {}
