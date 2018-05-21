import { Component, OnInit, Input } from '@angular/core';

let instances = 0;

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  count: number;

  @Input()
  question: any;

  constructor() {
    this.count = ++instances;
   }

  ngOnInit() {
  }

}
