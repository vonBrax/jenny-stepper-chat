import { Directive, TemplateRef} from '@angular/core';
import { CdkStepLabel } from '@angular/cdk/stepper';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[qunoStepLabel]'
})
// tslint:disable-next-line:directive-class-suffix
export class QunoStepLabel extends CdkStepLabel {
  constructor(template: TemplateRef<any>) {
    super(template);
  }
}
