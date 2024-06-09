import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';

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
    canActivate:[AuthGuardGuard]
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
  {
    path: 'table',component:TableComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
