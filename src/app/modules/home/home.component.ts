import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  tabs: {
    title: string;
    cityFrom: any;
    cityTo: any;
    dateFrom: any;
    dateTo: any;
    travellers: any;
  }[] = [];

  constructor() {
    this.tabs = [
      {
        title: 'One Way Journey',
        cityFrom: {
          header: 'From',
          details: 'Cairo',
          subDetails: 'CAI, Cairo Egypt',
        },
        cityTo: {
          header: 'To',
          details: 'Madinah',
          subDetails: 'MED, Mohammad Abdulaziz Saudi...',
        },
        dateFrom: {
          header: 'Departure',
          details: '10 Mar 24',
          subDetails: 'Sunday',
        },
        dateTo: {
          header: 'Return',
          details: '30 Mar 24',
          subDetails: 'Saturday',
        },
        travellers: {
          header: 'Travellers & Class',
          details: '1 Traveller',
          subDetails: 'First Class',
        },
      },
      {
        title: 'Two Way Journey',
        cityFrom: {
          header: 'From',
          details: 'Cairo',
          subDetails: 'CAI, Cairo Egypt',
        },
        cityTo: {
          header: 'To',
          details: 'Madinah',
          subDetails: 'MED, Mohammad Abdulaziz Saudi...',
        },
        dateFrom: {
          header: 'Departure',
          details: '10 Mar 24',
          subDetails: 'Sunday',
        },
        dateTo: {
          header: 'Return',
          details: '30 Mar 24',
          subDetails: 'Saturday',
        },
        travellers: {
          header: 'Travellers & Class',
          details: '1 Traveller',
          subDetails: 'First Class',
        },
      },
      {
        title: 'Multi City Journey',
        cityFrom: {
          header: 'From',
          details: 'Cairo',
          subDetails: 'CAI, Cairo Egypt',
        },
        cityTo: {
          header: 'To',
          details: 'Madinah',
          subDetails: 'MED, Mohammad Abdulaziz Saudi...',
        },
        dateFrom: {
          header: 'Departure',
          details: '10 Mar 24',
          subDetails: 'Sunday',
        },
        dateTo: {
          header: 'Return',
          details: '30 Mar 24',
          subDetails: 'Saturday',
        },
        travellers: {
          header: 'Travellers & Class',
          details: '1 Traveller',
          subDetails: 'First Class',
        },
      },
    ];
  }
}
