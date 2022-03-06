import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { IProduct } from "../../model/product";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  @Output() deleted = new EventEmitter<string>();
  @Output() editing = new EventEmitter<string>();

  constructor() { }

  editProduct(id) {
    this.editing.emit(id)
  }

  deleteProduct(id: string) {
    this.deleted.emit(id)
  }

}
