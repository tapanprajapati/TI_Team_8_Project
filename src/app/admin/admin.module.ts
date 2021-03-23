import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';

import { SharedModule } from '@app/@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AdminComponent],
  providers: [],
})
export class AdminModule {}
