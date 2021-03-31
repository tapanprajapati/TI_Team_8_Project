import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateRoutingModule } from './donate-routing.module';

import { DonateComponent } from './donate.component';

@NgModule({
  imports: [CommonModule, DonateRoutingModule],
  declarations: [DonateComponent],
})
export class DonateModule {}
