import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-workouts-filter',
  templateUrl: './workouts-filter.component.html',
  styleUrls: ['./workouts-filter.component.scss']
})
export class WorkoutsFilterComponent implements OnInit {
  selectedValues = [];

  constructor() { }

  ngOnInit() {
  }

  onFilter(form: NgForm) {

    

    console.log(form.value);

    // if (form.value.control.value) {
    //   this.selectedValues.push();
    // } else {
    //   console.log('didn\'t work lol');
    // }
    // console.log(form);
  }
}
