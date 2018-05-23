import { PortalModule } from '@angular/cdk/portal';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule, ErrorStateMatcher } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { QunoHorizontalStepper, QunoStep, QunoStepper, QunoVerticalStepper } from './stepper';
import { QunoStepperNext, QunoStepperPrevious } from './stepper-button';
import { qunoStepperAnimations } from './stepper-animations';

@NgModule({
  imports: [
    CommonModule,
    MatCommonModule,
    PortalModule,
    CdkStepperModule,
    MatRippleModule,
    MatIconModule
  ],
  exports: [
    MatCommonModule,
    QunoHorizontalStepper,
    QunoVerticalStepper,
    QunoStep,
    QunoStepper,
    QunoStepperNext,
    QunoStepperPrevious,
  ],
  declarations: [
    QunoHorizontalStepper,
    QunoVerticalStepper,
    QunoStep,
    QunoStepper,
    QunoStepperNext,
    QunoStepperPrevious,
  ],
  providers: [ErrorStateMatcher]
})
export class QunoStepperModule {}
