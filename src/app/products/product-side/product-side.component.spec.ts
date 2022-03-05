import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSideComponent } from './product-side.component';

describe('ProductSideComponent', () => {
  let component: ProductSideComponent;
  let fixture: ComponentFixture<ProductSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
