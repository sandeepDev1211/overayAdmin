import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageSettingComponent } from './home-page-setting.component';

const routes: Routes = [{ path: '', component: HomePageSettingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageSettingRoutingModule {}
