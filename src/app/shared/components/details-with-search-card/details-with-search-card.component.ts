import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Calendar } from 'primeng/calendar';
import { Dropdown } from 'primeng/dropdown';
import { AirportsService } from 'src/app/core/services/airports.service';

@Component({
  selector: 'app-details-with-search-card',
  templateUrl: './details-with-search-card.component.html',
  styleUrls: ['./details-with-search-card.component.scss'],
})
export class DetailsWithSearchCardComponent implements OnInit {
  @Input() tab: any;
  travellerForm!: FormGroup;
  flightForm!: FormGroup;
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
    private date: DatePipe
  ) {}

  ngOnInit(): void {
    this.travellerForm = this.fb.group({
      adults: [0, Validators.required],
      children: [0, Validators.required],
      infants: [0, Validators.required],
      class: ['', Validators.required],
    });
    this.flightForm = this.fb.group({
      cityFrom: [null, Validators.required],
      cityTo: [null, Validators.required],
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required],
      travellers: [this.travellerForm.value],
      trips: this.fb.array([this.createTrip()]),
    });

    if (this.type !== 2) {
      this.flightForm.get('dateTo')?.setValidators(null);
      this.flightForm.get('dateTo')?.updateValueAndValidity();
      this.flightForm.get('dateTo')?.disable();
    }

    this.classes = [
      { name: 'Economy', code: '1' },
      { name: 'Business Class', code: '3' },
      { name: 'Premium Economy', code: '2' },
      { name: 'First Class', code: '4' },
    ];
  }

  createTrip(): FormGroup {
    return this.fb.group({
      cityFrom: [null, Validators.required],
      cityTo: [null, Validators.required],
      dateFrom: [null, Validators.required],
    });
  }

  get trips(): FormArray {
    return this.flightForm.get('trips') as FormArray;
  }

  addTrip(): void {
    this.trips.push(this.createTrip());
  }

  removeTrip(index: number): void {
    this.trips.removeAt(index);
  }
  multiArray: any[] = [];
  onSubmit() {
    if (this.flightForm.get('dateFrom')?.value) {
      this.dateCalendarFrom = this.date.transform(
        this.flightForm.get('dateFrom')?.value,
        'dd-MMM-yyyy'
      );
      this.flightForm.get('dateFrom')?.setValue(this.dateCalendarFrom);
    }
    if (this.flightForm.get('dateTo')?.value) {
      this.dateCalendarTo = this.date.transform(
        this.flightForm.get('dateTo')?.value,
        'dd-MMM-yyyy'
      );
      this.flightForm.get('dateTo')?.setValue(this.dateCalendarTo);
    }
    if (this.type === 2 || this.type === 1) {
      let body = {
        type: this.type,
        countryFrom: this.flightForm.get('cityFrom')?.value?.iataCode,
        countryTo: this.flightForm.get('cityTo')?.value?.iataCode,
        dateFrom: this.flightForm.get('dateFrom')?.value
          ? this.flightForm.get('dateFrom')?.value
          : null,
        dateTo: this.flightForm.get('dateTo')?.value
          ? this.flightForm.get('dateTo')?.value
          : null,
        travellers: this.travellerForm?.value,
      };
      this.valueChange.emit(body);
    } else {
      for (let i = 0; i < this.trips?.value?.length; i++) {
        let dateMultiFrom = this.date.transform(
          this.trips.at(i).get('dateFrom')?.value,
          'dd-MMM-yyyy'
        );
        this.multiArray.push({
          cityFrom: this.trips?.value[i]?.cityFrom?.iataCode,
          cityTo: this.trips?.value[i]?.cityTo?.iataCode,
          dateFrom: dateMultiFrom,
        });
      }

      let url = `https://book.sakinatours.com/Flight/search?dep1=${
        this.flightForm.get('cityFrom')?.value?.iataCode
      }&ret1=${this.flightForm.get('cityTo')?.value?.iataCode}&dtt1=${
        this.flightForm.get('dateFrom')?.value
      }`;
      this.multiArray.forEach((trip, index) => {
        url += `&dep${index + 2}=${trip.cityFrom}&ret${index + 2}=${
          trip.cityTo
        }&dtt${index + 2}=${trip.dateFrom}&cl1=${
          this.travellerForm?.value?.class?.code
        }&triptype=${this.type}&adult=${
          this.travellerForm?.value?.adults
        }&child=${this.travellerForm?.value?.children}&infant=${
          this.travellerForm?.value?.infants
        }&direct=false&baggage=false&umrah=false&key=OW&airlines=&ref=false&langcode=EN&curr=TND&ipc=false`;
      });
      this.valueChange.emit(url);
    }
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
