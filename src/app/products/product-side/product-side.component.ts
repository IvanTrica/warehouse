import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card-side',
  templateUrl: './product-side.component.html',
  styleUrls: ['./product-side.component.scss']
})
export class ProductSideComponent {
  @Input() floors
  @Input() sections
  code: string = ''
  floor: number = 0
  section: number = 0

  constructor() { }

  resetFilter() {
    this.code = '';
    this.floor = 0;
    this.section = 0
  }
}
