import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { CdkStep, CdkStepper, StepContentPositionState } from '@angular/cdk/stepper';
import { AnimationEvent } from '@angular/animations';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
  } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { takeUntil } from 'rxjs/operators';
import { qunoStepperAnimations } from './stepper-animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'quno-step',
  templateUrl: './step.html',
  encapsulation: ViewEncapsulation.None,
  exportAs: 'qunoStep',
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
export class QunoStep extends CdkStep implements ErrorStateMatcher {

  // @Input() state: string;
  // @Input() index: number;
  // @Input() selected: boolean;
  // @Input() active: boolean;
  // @Input() optional: boolean;

  constructor( @Inject(forwardRef(() => QunoStepper)) stepper: QunoStepper,
               @SkipSelf() private _errorStateMatcher: ErrorStateMatcher) {
    super(stepper);
  }

  // _getHostElement() {
  //   return this._element.nativeElement;
  // }
  // focus() {
  //   this._getHostElement().focus();
  // }
  // ngOnDestroy() {
  //   this._focusMonitor.stopMonitoring(this._element.nativeElement);
  // }

  /** Custom error state matcher that additionally checks for validity of interacted form. */
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const originalErrorState = this._errorStateMatcher.isErrorState(control, form);

    // Custom error state checks for the validity of form that is not submitted or touched
    // since user can trigger a form change by calling for another step without directly
    // interacting with the current form.
    const customErrorState = !!(control && control.invalid && this.interacted);

    return originalErrorState || customErrorState;
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[qunoStepper]'
})
// tslint:disable-next-line:directive-class-suffix
export class QunoStepper extends CdkStepper implements AfterContentInit {

  /** The list of step headers of the steps in the stepper. */
  @ViewChildren(QunoStep) _stepHeader: QueryList<QunoVerticalStepper>;

  /** Steps that the stepper holds */
  @ContentChildren(QunoStep) _steps: QueryList<QunoStep>;

  /** Event emitted when the current step is done transitioning in. */
  @Output() readonly animationDone: EventEmitter<void> = new EventEmitter<void>();

  ngAfterContentInit() {
    // Mark the component for change detection whenever the content children query changes
    this._steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this._stateChanged() );
  }

  _animationDone(event: AnimationEvent) {
    if ( (event.toState as StepContentPositionState) === 'current') {
      this.animationDone.emit();
    }
  }
}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'quno-horizontal-stepper',
  exportAs: 'qunoHorizonzalStepper',
  templateUrl: './stepper-horizontal.html',
  styleUrls: ['stepper.css'],
  // tslint:disable-next-line:use-input-property-decorator
  inputs: ['selectedIndex'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'quno-stepper-horizontal',
    'aria-orientation': 'horizontal',
    'role': 'tablist'
  },
  animations: [qunoStepperAnimations.horizontalStepTransition],
  providers: [{provide: QunoStepper, useExisting: QunoHorizontalStepper}],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
export class QunoHorizontalStepper extends QunoStepper { }

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'quno-vertical-stepper',
  exportAs: 'qunoVerticalStepper',
  templateUrl: './stepper-vertical.html',
  styleUrls: ['stepper.css'],
  // tslint:disable-next-line:use-input-property-decorator
  inputs: ['selectedIndex'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'quno-stepper-vertical',
    'aria-orientation': 'vertical',
    'role': 'tablist'
  },
  animations: [qunoStepperAnimations.verticalStepTransition],
  providers: [{provide: QunoStepper, useExisting: QunoVerticalStepper}],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
export class QunoVerticalStepper extends QunoStepper implements OnDestroy {

  @Input() state: string;
  @Input() index: number;
  @Input() _selected: boolean;
  @Input() active: boolean;
  @Input() optional: boolean;
  @ViewChild('focusable') focusable: ElementRef;


  constructor(@Optional() dir: Directionality, changeDetectorRef: ChangeDetectorRef, private _focusMonitor: FocusMonitor,
               private _element: ElementRef) {
    super(dir, changeDetectorRef);
    this._orientation = 'vertical';
    _focusMonitor.monitor(_element.nativeElement, true);
  }

  _getHostElement() {
    // return this._element.nativeElement;
    console.log(this.index);
    return this.focusable.nativeElement;
  }
  focus() {
    this._getHostElement().focus();
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._element.nativeElement);
  }
}
