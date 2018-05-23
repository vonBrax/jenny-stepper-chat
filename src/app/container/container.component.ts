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
  @ViewChild(QunoVerticalStepper) _stepper: QunoVerticalStepper;
  @ViewChildren(QunoStep) _steps: QueryList<QunoStep>;
  formGroup: FormGroup;
  cursor = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const controls = this.questions.reduce((acc, cur) => {
      acc[cur.field] = ['', Validators.required];
      return acc;
    }, {});
    this.formGroup = this.fb.group(controls);
  }

  handleClick(evt: any): void {
    // this.btnNext.nativeElement.click();
    const input = evt.target.closest('input');
    if (input) {
      // setTimeout(() => this.btnNext.nativeElement.click() );
      // this.setPreviousAnswer(input, this.cursor);
      // this.cursor++;
      // this.setSelectedAnswer(this._stepper.selected);
      setTimeout( () => {
        this._stepper.next();
        console.log(this._stepper._getFocusIndex());
        console.log(this._stepper.selectedIndex);
        console.log(this._stepper._getHostElement());
        this._stepper.focus();
        // curr.focus();
      });
    }
  }

  setSelectedAnswer(step: CdkStep ): void {
    console.log(this._stepper.selectedIndex);
    console.log(step);
  }

  selectStep(index) {
    this._steps.toArray()[index].select();
    this._stepper.selected.select();
  }

}
