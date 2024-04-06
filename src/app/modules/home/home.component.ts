import { Component, Input } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  tabs: {
    id: number;
    title: string;
    cityFrom?: any;
    cityTo?: any;
    dateFrom?: any;
    dateTo?: any;
    travellers?: any;
  }[] = [];
  valueChange: any;

  constructor() {
    this.tabs = [
      {
        id: 1,
        title: 'One Way Journey',
        cityFrom: {
          header: 'From',
        },
        cityTo: {
          header: 'To',
        },
        dateFrom: {
          header: 'Departure',
        },
        dateTo: {
          header: 'Return',
        },
        travellers: {
          header: 'Travellers & Class',
        },
      },
      {
        id: 2,
        title: 'Two Way Journey',
        cityFrom: {
          header: 'From',
        },
        cityTo: {
          header: 'To',
        },
        dateFrom: {
          header: 'Departure',
        },
        dateTo: {
          header: 'Return',
        },
        travellers: {
          header: 'Travellers & Class',
        },
      },
      {
        id: 3,
        title: 'Mutli City Journey',
        cityFrom: {
          header: 'From',
        },
        cityTo: {
          header: 'To',
        },
        dateFrom: {
          header: 'Departure',
        },
        dateTo: {
          header: 'Return',
        },
        travellers: {
          header: 'Travellers & Class',
        },
      },
    ];
  }

  formChange(body: any) {
    if (body.type === 1) {
      window.location.href = `https://book.sakinatours.com/Flight/search?dep1=${body.countryFrom}&ret1=${body.countryTo}&dtt1=${body.dateFrom}&cl1=${body?.travellers?.class?.code}&triptype=${this.type}&adult=${body?.travellers?.adults}&child=${body?.travellers?.children}&infant=${body?.travellers?.infants}
        .code}&direct=false&baggage=false&umrah=false&key=OW&airlines=&ref=false&langcode=EN&curr=TND&ipc=false`;
    } else if (body.type === 2) {
      window.location.href = `https://book.sakinatours.com/Flight/search?dep1=${body.countryFrom}&ret1=${body.countryTo}&dtt1=${body.dateFrom}&dtt2=${body.dateTo}&cl1=${body?.travellers?.class?.code}&triptype=${this.type}&adult=${body?.travellers?.adults}&child=${body?.travellers?.children}&infant=${body?.travellers?.infants}&direct=false&baggage=false&umrah=false&key=OW&airlines=&ref=false&langcode=EN&curr=TND&ipc=false`;
    } else if (this.type === 3) {      
      window.location.href = body;
    }
  }
  type: any = 1;
  onTabChange(data: any) {
    this.type = data.index + 1;
  }
}
