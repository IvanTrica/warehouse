import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import { ProductsComponent } from "./products.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { ProductRoutingModule } from "./product-routing.module";
import { ProductSideComponent } from "./product-side/product-side.component";
import { ProductFormComponent } from './product-form/product-form.component';

const COMPONENTS = [
  ProductsComponent,
  ProductCardComponent,
  ProductSideComponent,
  ProductFormComponent
]

const MODULES = [
  CommonModule,
  ProductRoutingModule,
  SharedModule
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ]
})
export class ProductModule { }
