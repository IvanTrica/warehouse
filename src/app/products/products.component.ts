import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../service/products.service";
import { IProduct } from "../model/product";
import { Observable } from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$!: Observable<IProduct[]>;

  constructor(private products: ProductsService) { }

  ngOnInit(): void {
    this.products$ = this.products.getPosts()
  }

}
