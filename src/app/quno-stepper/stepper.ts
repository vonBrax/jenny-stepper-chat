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
  EventEmitter,
  forwardRef,
  Inject,
  Optional,
  Output,
  QueryList,
  SkipSelf,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { QunoStepHeader } from './step-header';
import { QunoStepLabel } from './step-label';
import { takeUntil } from 'rxjs/operators';
import { qunoStepperAnimations } from './stepper-animations';
import { QunoStepperIcon, QunoStepperIconContext } from './stepper-icon';

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

  /** Content for step label given by '<ng-template qunoStepLabel>' */
  @ContentChild(QunoStepLabel) stepLabel: QunoStepLabel;

  constructor( @Inject(forwardRef(() => QunoStepper)) stepper: QunoStepper,
               @SkipSelf() private _errorStateMatcher: ErrorStateMatcher ) {
    super(stepper);
  }

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
  @ViewChildren(QunoStepHeader) _stepHeader: QueryList<QunoStepHeader>;

  /** Steps that the stepper holds */
  @ContentChildren(QunoStep) _steps: QueryList<QunoStep>;

  /** Custom icon overrides passed in by the consumer. */
  @ContentChildren(QunoStepperIcon) _icons: QueryList<QunoStepperIcon>;

  /** Event emitted when the current step is done transitioning in. */
  @Output() readonly animationDone: EventEmitter<void> = new EventEmitter<void>();

  /** Consumer-specified template-refs to be used to override the header icons. */
  _iconOverrides: {[key: string]: TemplateRef<QunoStepperIconContext>} = {};

  ngAfterContentInit() {
    const icons = this._icons.toArray();

    ['edit', 'done', 'number'].forEach(name => {
      const override = icons.find(icon => icon.name === name);

      if (override) {
        this._iconOverrides[name] = override.templateRef;
      }
    });

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
export class QunoVerticalStepper extends QunoStepper {
  constructor(@Optional() dir: Directionality, changeDetectorRef: ChangeDetectorRef) {
    super(dir, changeDetectorRef);
    this._orientation = 'vertical';
  }
}
