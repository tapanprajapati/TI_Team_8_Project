import { PickupComponent } from './pickup/pickup.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@app/home/home.component';
import { SignUpComponent } from '@app/signup/signup.component';
import { NotFoundComponent } from '@app/not-found/not-found.component';
import { ForgotPasswordComponent } from '@app/forgot-password/forgot-password.component';
import { AuthenticationGuard } from '@app/auth';

import { APP_TITLES } from '@core/const/app.const';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: APP_TITLES?.home },
  },
  { path: 'signup', component: SignUpComponent, data: { title: APP_TITLES?.signup } },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { title: APP_TITLES?.signup },
    canActivate: [AuthenticationGuard],
  },
  { path: 'pickup', component: PickupComponent, data: { title: APP_TITLES?.pickup } },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { title: APP_TITLES?.forgot_pwd } },
  { path: 'updatepassword/:token', component: UpdatePasswordComponent, data: { title: APP_TITLES?.update_pwd } },
  { path: 'donate', loadChildren: () => import('./donate/donate.module').then((m) => m.DonateModule) },
  {
    path: 'profile',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [AuthenticationGuard],
  },
  { path: 'products', loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule) },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
    canActivate: [AuthenticationGuard],
  },
  { path: 'policy', loadChildren: () => import('./policy/policy.module').then((m) => m.PolicyModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then((m) => m.ContactModule) },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthenticationGuard],
  },
  { path: 'not-found', component: NotFoundComponent, data: { title: APP_TITLES?.not_found } },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
