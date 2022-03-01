import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from "./products.component";
import {ProductComponent} from "./product/product.component";
import { HttpClientModule } from '@angular/common/http';
import {PostsRoutingModule} from "./product-routing.module";



@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PostsRoutingModule

  ]
})
export class ProductModule { }
