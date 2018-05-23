import { AnimationTriggerMetadata, trigger, state, style, transition, animate } from '@angular/animations';


export const qunoStepperAnimations: {
  readonly horizontalStepTransition: AnimationTriggerMetadata;
  readonly verticalStepTransition: AnimationTriggerMetadata;
  readonly verticalStepHeaderTransition: AnimationTriggerMetadata;
} = {
  /** Animation that transitions the step along the X axis in a horizontal stepper. */
  horizontalStepTransition: trigger('stepTransition', [
    state('previous', style({transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden'})),
    state('current', style({transform: 'none', visibility: 'visible'})),
    state('next', style({transform: 'translate3d(100%, 0, 0)', visibility: 'hidden'})),
    transition('* => *', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
  ]),

  /** Animation that transitions the step along the Y axis in a vertical stepper */
  verticalStepTransition: trigger('stepTransition', [
    state('previous', style({height: '0px', visibility: 'hidden', transform: 'none'})),
    state('next', style({height: '0px', visibility: 'hidden', transform: 'translateY(-48px)'})),
    state('current', style({height: '*', visibility: 'visible', transform: 'translateY(-48px)'})),
    // transition('previous => current', animate('500ms 500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),

    transition('current => *', animate('225ms 0ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    transition('* => current', animate('500ms 225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))

    // transition('next <=> current', animate('225ms 225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    // transition('current => next', animate('225ms 1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    // transition('* <=> current', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ]),

  verticalStepHeaderTransition: trigger('headerTransition', [
    // state('previous', style({height: '*', visibility: 'visible'})),
    // state('next', style({height: '0px', visibility: 'hidden', padding: '12px 24px'})),
    // state('current', style({height: '0px', visibility: 'hidden', padding: '12px 24px'})),
    state('previous', style({transform: 'scaleY(1)', visibility: 'visible'})),
    state('next', style({transform: 'scaleY(0)', visibility: 'hidden'})),
    state('current', style({transform: 'scaleY(0)', visibility: 'hidden'})),
    transition('* => *', animate('225ms ease-in-out'))
  ])
};
