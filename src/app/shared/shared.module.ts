import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputNumberModule } from 'primeng/inputnumber';

import { DetailsWithSearchCardComponent } from './components/details-with-search-card/details-with-search-card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DetailsWithSearchCardComponent],
  imports: [CommonModule, OverlayPanelModule, InputNumberModule, ReactiveFormsModule],
  exports: [DetailsWithSearchCardComponent],
})
export class SharedModule {}
