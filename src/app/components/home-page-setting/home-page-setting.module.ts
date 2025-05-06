import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageSettingRoutingModule } from './home-page-setting-routing.module';
import { HomePageSettingComponent } from './home-page-setting.component';


@NgModule({
  declarations: [
    HomePageSettingComponent
  ],
  imports: [
    CommonModule,
    HomePageSettingRoutingModule
  ]
})
export class HomePageSettingModule { }
