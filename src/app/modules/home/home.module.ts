import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { TabViewModule } from 'primeng/tabview';

import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, TabViewModule, SharedModule],
})
export class HomeModule {}
