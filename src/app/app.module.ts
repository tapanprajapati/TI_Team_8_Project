import { AdminModule } from './admin/admin.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from '@app/material.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { AppRoutingModule } from '@app/app-routing.module';

import { AppComponent } from '@app/app.component';
import { HomeComponent } from '@app/home/home.component';
import { SignUpComponent } from '@app/signup/signup.component';
import { NotFoundComponent } from '@app/not-found/not-found.component';
import { ForgotPasswordComponent } from '@app/forgot-password/forgot-password.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { JwtModule } from '@auth0/angular-jwt';

import { environment } from './../environments/environment.prod';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PickupComponent } from './pickup/pickup.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatGridListModule,
    FlexLayoutModule,
    RouterModule,
    CoreModule,
    SharedModule,
    AuthModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    MatSortModule,
    MatTableModule,
    JwtModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    CheckoutComponent,
    PickupComponent,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
