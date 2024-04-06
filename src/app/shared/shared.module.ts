import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

import { DetailsWithSearchCardComponent } from './components/details-with-search-card/details-with-search-card.component';

@NgModule({
  declarations: [DetailsWithSearchCardComponent],
  imports: [
    CommonModule,
    OverlayPanelModule,
    InputNumberModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
  ],
  exports: [DetailsWithSearchCardComponent],
  providers: [DatePipe],
})
export class SharedModule {}
