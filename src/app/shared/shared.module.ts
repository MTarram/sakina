import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';

import { DetailsWithSearchCardComponent } from './components/details-with-search-card/details-with-search-card.component';

@NgModule({
  declarations: [DetailsWithSearchCardComponent],
  imports: [
    CommonModule,
    OverlayPanelModule,
    InputNumberModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  exports: [DetailsWithSearchCardComponent],
})
export class SharedModule {}
