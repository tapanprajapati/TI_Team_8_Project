import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';

import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, UserRoutingModule],
  declarations: [ProfileComponent],
  providers: [],
})
export class UserModule {}
