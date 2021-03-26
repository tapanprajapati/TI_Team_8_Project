import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from '@shared/loader/loader.component';
import { HeaderComponent } from '@shared/header/header.component';
import { FooterComponent } from '@shared/footer/footer.component';
import { MatDialogWrapperComponent } from '@shared/mat-dialog-wrapper/mat-dialog-wrapper.component';

@NgModule({
  imports: [RouterModule, FontAwesomeModule, FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent, HeaderComponent, FooterComponent, MatDialogWrapperComponent],
  exports: [LoaderComponent, HeaderComponent, FooterComponent, MatDialogWrapperComponent],
})
export class SharedModule {}
