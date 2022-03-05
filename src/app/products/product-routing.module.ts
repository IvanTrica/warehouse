import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from "./products.component";
import { ProductFormComponent } from "./product-form/product-form.component";

const routes: Routes = [
  { path: '', component: ProductsComponent},
  { path: 'product-card/:id', component: ProductFormComponent },
  { path: 'product-card', component: ProductFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
