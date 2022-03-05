import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from "./products.component";
import {ProductCardComponent} from "./product-card/product-card.component";
import { ProductRoutingModule } from "./product-routing.module";
import { ProductSideComponent } from "./product-side/product-side.component";
import { ProductFormComponent } from './product-form/product-form.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    ProductsComponent,
    ProductCardComponent,
    ProductSideComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
