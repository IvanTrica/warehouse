import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductFilterPipe } from "./pipes/product-filter.pipe";
import { ButtonComponent } from "./components/button/button.component";
import { SpinnerComponent } from './components/spinner/spinner.component';

const COMPONENTS = [
  ButtonComponent,
  SpinnerComponent
];

const PIPES = [
  ProductFilterPipe
];

const MODULES = [
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES ],
  exports: [ ...COMPONENTS, ...PIPES, ...MODULES ],
  imports: [
    ...MODULES
  ]
})
export class SharedModule { }
