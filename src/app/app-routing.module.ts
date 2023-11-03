import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'admin-login', pathMatch: 'full' },
  {
    path: 'admin-login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./components/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: 'coupons',
    loadChildren: () =>
      import('./components/coupons/coupons.module').then(
        (m) => m.CouponsModule
      ),
  },
  {
    path: 'home-settings',
    loadChildren: () =>
      import('./components/home-page-setting/home-page-setting.module').then(
        (m) => m.HomePageSettingModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./components/orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./components/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./components/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./components/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
