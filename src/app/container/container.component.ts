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
  // selectedIndex = 0;

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
    // const input = evt.target.closest('input') as HTMLElement;
    // const label = evt.target.closest('label') as HTMLElement;
    if (evt.target.tagName === 'LABEL' && evt.target.classList.contains('selected-answer')) {
      evt.preventDefault();
      const container = evt.target.parentElement;
      const collection = Array.from(document.querySelectorAll('.quno-answers'));
      const index = collection.findIndex( col => col === container);
      console.log(index);
      this.selectStep(index);
    } else if (evt.target.tagName === 'INPUT' && evt.target.closest('label') ) {
      // setTimeout(() => this.btnNext.nativeElement.click() );
      // this.setPreviousAnswer(input, this.cursor);
      // this.cursor++;
      // this.setSelectedAnswer(this._stepper.selected);
      setTimeout( () => {
        this._stepper.next();
        evt.target.parentElement.classList.add('selected-answer');
        console.log(this._stepper._getFocusIndex());
        console.log(this._stepper.selectedIndex);
        // const step = this._steps.find( (el, i) => i === this._stepper.selectedIndex);
        // console.log(this._steps());
        // this._stepper.focus();
        // curr.focus();
      });
    }
  }

  // setSelectedAnswer(step: CdkStep ): void {
  //   console.log('AM I BEING CALLED?');
  //   console.log(this._stepper.selectedIndex);
  //   console.log(step);
  // }

  selectStep(index: number): void {
    if (typeof index !== 'number') { return; }
    if (window.confirm('This will delete all the answers after it. Are you sure?') ) {
      this._steps.toArray()[index].select();
      // this._stepper.selected.select();
      this.resetAnswersState(index);
    }
  }

  resetAnswersState(index: number): void {
    const answersContainer = document.querySelectorAll('.quno-answers');
    for (let i = index; i < this._steps.length; i++) {
      Array.from( answersContainer[i] && answersContainer[i].querySelectorAll('.btn-answer') as NodeListOf<Element>)
        .forEach( el => el.classList.remove('selected-answer') );
    }
  }

}
