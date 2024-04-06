import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Calendar } from 'primeng/calendar';
import { Dropdown } from 'primeng/dropdown';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { AirportsService } from 'src/app/core/services/airports.service';

@Component({
  selector: 'app-details-with-search-card',
  templateUrl: './details-with-search-card.component.html',
  styleUrls: ['./details-with-search-card.component.scss'],
})
export class DetailsWithSearchCardComponent implements OnInit {
  @Input() tab: any;
  travellerForm!: FormGroup;
  classes: any[] | undefined;
  selectedCountryFrom: any;
  selectedCountryTo: any;
  countriesTo: any[] | undefined;
  countriesFrom: any[] | undefined;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  dateCalendarFrom!: any;
  dateCalendarTo!: any;
  numberOfTravellers: any;
  @Input() type: any = 1;
  dateTime: Date = new Date();
  @ViewChild('citFromInput', { static: false }) citFromInput!: Dropdown;
  @ViewChild('citToInput', { static: false }) citToInput!: Dropdown;

  @ViewChild('dateFromCalendar', { static: false }) dateFromCalendar!: Calendar;
  @ViewChild('dateToCalendar', { static: false }) dateToCalendar!: Calendar;

  constructor(
    private fb: FormBuilder,
    public airPortsService: AirportsService,
    private date: DatePipe,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.travellerForm = this.fb.group({
      adults: ['', Validators.required],
      children: ['', Validators.required],
      infants: ['', Validators.required],
      class: ['', Validators.required],
    });

    this.classes = [
      { name: 'Economy', code: '1' },
      { name: 'Business Class', code: '3' },
      { name: 'Premium Economy', code: '2' },
      { name: 'First Class', code: '4' },
    ];
  }

  onSubmit() {
    if (this.dateCalendarFrom) {
      this.dateCalendarFrom = this.date.transform(
        this.dateCalendarFrom,
        'dd-MMM-yyyy'
      );
    }
    if (this.dateCalendarTo) {
      this.dateCalendarTo = this.date.transform(
        this.dateCalendarTo,
        'dd-MMM-yyyy'
      );
    }
    let body = {
      type: this.type,
      countryFrom: this.selectedCountryFrom?.iataCode,
      countryTo: this.selectedCountryTo?.iataCode,
      dateFrom: this.dateCalendarFrom ? this.dateCalendarFrom : null,
      dateTo: this.dateCalendarTo ? this.dateCalendarTo : null,
      travellers: this.travellerForm?.value,
    };
    this.valueChange.emit(body);
  }

  onInputFromChange(data: any): void {
    this.airPortsService.searchLocations(data.filter).subscribe((data: any) => {
      this.countriesFrom = data.data;
    });
  }

  onCountryFromChange(event: any): void {
    // Here you can also load extra details for the selected country if needed
    this.selectedCountryFrom = event.value;
  }

  onInputToChange(data: any): void {
    this.airPortsService.searchLocations(data.filter).subscribe((data: any) => {
      this.countriesTo = data.data;
    });
  }

  onCountryToChange(event: any): void {
    // Here you can also load extra details for the selected country if needed
    this.selectedCountryTo = event.value;
  }

  onApplyClick() {
    this.numberOfTravellers =
      this.travellerForm.get('adults')?.value +
      this.travellerForm.get('children')?.value +
      this.travellerForm.get('infants')?.value;
  }

  onCounterChange(event: any) {
    this.numberOfTravellers =
      this.travellerForm.get('adults')?.value +
      this.travellerForm.get('children')?.value +
      this.travellerForm.get('infants')?.value;
  }

  openCalendar() {
    const calendarElement: HTMLElement =
      this.dateFromCalendar?.inputfieldViewChild?.nativeElement;
    if (calendarElement) {
      calendarElement.click();
    }
  }

  openCalendar2() {
    const calendarElement: HTMLElement =
      this.dateToCalendar?.inputfieldViewChild?.nativeElement;
    if (calendarElement) {
      calendarElement.click();
    }
  }
}
