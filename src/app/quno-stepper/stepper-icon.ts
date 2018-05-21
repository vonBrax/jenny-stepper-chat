import { Directive, Input, TemplateRef } from '@angular/core';

export interface QunoStepperIconContext {
  /** Index of the step */
  index: number;
  /** Whether the step is currently active */
  active: boolean;
  /** Whether the step is optional */
  optional: boolean;
}

/**
 * Template to be used to override the icons inside the step header.
*/
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'ng-template[qunoStepperIcon]'
})
// tslint:disable-next-line:directive-class-suffix
export class QunoStepperIcon {
  /** Name of the icon to be overridden. */
  // tslint:disable-next-line:no-input-rename
  @Input('qunoStepperIcon') name: 'edit' | 'done' | 'number';

constructor(public templateRef: TemplateRef<QunoStepperIconContext>) {}

}
