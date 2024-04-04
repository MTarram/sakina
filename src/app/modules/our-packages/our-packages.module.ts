import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurPackagesRoutingModule } from './our-packages-routing.module';
import { OurPackagesComponent } from './our-packages.component';

@NgModule({
  declarations: [OurPackagesComponent],
  imports: [CommonModule, OurPackagesRoutingModule],
})
export class OurPackagesModule {}
