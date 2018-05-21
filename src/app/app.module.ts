import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { ContainerComponent } from './container/container.component';
import { StepComponent } from './step/step.component';

import { QunoStepperModule } from './quno-stepper';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    ContainerComponent,
    StepComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    QunoStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
