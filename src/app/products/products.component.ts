import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ProductsService } from "./service/products.service";
import { ProductSideComponent } from "./product-side/product-side.component";
import { ILocation } from "../model/location";
import { IProduct } from "../model/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$!: Observable<IProduct[]>;
  floors$!: Observable<ILocation[]>;
  sections$!: Observable<ILocation[]>;
  @ViewChild(ProductSideComponent, { static: true}) ProductSideComponent;

  constructor(private productsService: ProductsService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchFloors();
    this.fetchSection();

  }
  deleteProduct(id: string) {
    this.productsService.delete(id).subscribe(() => this.fetchProducts())
  }

  editProduct(id: string) {
    this.router.navigateByUrl(`product-card/${id}`)
  }

  private fetchProducts() {
    this.products$ = this.productsService.getProducts()
  }

  addNew() {
    this.router.navigateByUrl(`product-card`)
  }

  private fetchFloors() {
    this.floors$ = this.productsService.getFloors()
  }

  private fetchSection() {
    this.sections$ = this.productsService.getSections()
  }
}
