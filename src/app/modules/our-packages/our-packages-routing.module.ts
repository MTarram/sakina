import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OurPackagesComponent } from './our-packages.component';

const routes: Routes = [
  {
    path: '',
    component: OurPackagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OurPackagesRoutingModule {}
