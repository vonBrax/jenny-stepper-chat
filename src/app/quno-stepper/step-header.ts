import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy,
Input,
TemplateRef,
ElementRef,
/* ChangeDetectorRef */ } from '@angular/core';

import { QunoStepLabel } from './step-label';
import { QunoStepperIconContext } from './stepper-icon';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'quno-step-header',
  templateUrl: './step-header.html',
  styleUrls: ['step-header.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'quno-step-header',
    'role': 'tab'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
export class QunoStepHeader implements OnDestroy {

  /** State of the given step */
  @Input() state: string;

  /** Label of the given step */
  @Input() label: QunoStepLabel | string;

  /** Overrides for the header icons, passed in via the stepper */
  @Input() iconOverrides: {[key: string]: TemplateRef<QunoStepperIconContext>};

  /** Index of the given step */
  @Input() index: number;

  /** Whether the given step is selected */
  @Input() selected: boolean;

  /** Whether the given label is active */
  @Input() active: boolean;

  /** Whether the given step is optional */
  @Input() optional: boolean;

  constructor(
    private _focusMonitor: FocusMonitor,
    private _element: ElementRef,
    /* changeDetectorRef: ChangeDetectorRef */ ) {
      _focusMonitor.monitor(_element.nativeElement, true);
    }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._element.nativeElement);
  }

  /** Returns string label of given step if it is a string label  */
  _stringLabel(): string | null {
    return this.label instanceof QunoStepLabel ? null : this.label;
  }

  /** Returns QunoStepLabel if the label of a given step is a template label */
  _templateLabel(): QunoStepLabel | null {
    return this.label instanceof QunoStepLabel ? this.label : null;
  }

  /** Returns the host HTML element */
  _getHostElement() {
    return this._element.nativeElement;
  }

  /** Template context variable that are exposed to the 'qunoStepperIcon' instances */
  _getIconContext(): QunoStepperIconContext {
    return {
      index: this.index,
      active: this.active,
      optional: this.optional
    };
  }

  focus() {
    this._getHostElement().focus();
  }
}
