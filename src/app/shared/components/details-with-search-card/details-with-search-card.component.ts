import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details-with-search-card',
  templateUrl: './details-with-search-card.component.html',
  styleUrls: ['./details-with-search-card.component.scss'],
})
export class DetailsWithSearchCardComponent implements OnInit {
  @Input() tab: any;
  travellerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.travellerForm = this.fb.group({
      adults: ['', Validators.required],
      children: ['', Validators.required],
      infants: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.travellerForm.value);
  }
}
