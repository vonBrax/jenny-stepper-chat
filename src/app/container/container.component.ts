import { QunoHorizontalStepper } from '../quno-stepper';
import { Component, OnInit, Input, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { QunoStep, QunoVerticalStepper } from '../quno-stepper/stepper';
import { CdkStep } from '@angular/cdk/stepper';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  @Input() questions;
  @ViewChild('btnNext') btnNext: ElementRef;
  @ViewChild(QunoVerticalStepper) _stepper: QunoHorizontalStepper;
  @ViewChildren(QunoStep) _steps: QueryList<QunoStep>;
  formGroup: FormGroup;
  cursor = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      tos_agree: ['', Validators.required],
      additional_info_grafts: ['', Validators.required],
      additional_info_age: ['', Validators.required]
    });
  }

  handleClick(evt: any): void {
    // this.btnNext.nativeElement.click();
    const input = evt.target.closest('input');
    if (input) {
      // setTimeout(() => this.btnNext.nativeElement.click() );
      // this.setPreviousAnswer(input, this.cursor);
      // this.cursor++;
      this.setSelectedAnswer(this._stepper.selected);
      setTimeout( () => this._stepper.next() );
    }
  }

  setSelectedAnswer(step: CdkStep ): void {
    console.log(step);
  }

}
