import { Directive } from '@angular/core';
import { CdkStepper, CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { QunoStepper } from './stepper';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'button[qunoStepperNext]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(click)': '_stepper.next()',
    '[type]': 'type'
  },
  // tslint:disable-next-line:use-input-property-decorator
  inputs: ['type'],
  providers: [{provide: CdkStepper, useExisting: QunoStepper}]
})
// tslint:disable-next-line:directive-class-suffix
export class QunoStepperNext extends CdkStepperNext { }

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'button[qunoStepperPrevious]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(click)': '_stepper.previous()',
    '[type]': 'type'
  },
  // tslint:disable-next-line:use-input-property-decorator
  inputs: ['type'],
  providers: [{provide: CdkStepper, useExisting: QunoStepper }]
})
// tslint:disable-next-line:directive-class-suffix
export class QunoStepperPrevious extends CdkStepperPrevious { }
