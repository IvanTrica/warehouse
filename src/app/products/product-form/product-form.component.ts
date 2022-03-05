import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../service/products.service";
import {IProduct} from "../../model/product";
import {Observable, Subscription} from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import {ILocation} from "../../model/location";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product$?: Subscription;
  floors$?: Observable<ILocation[]>;
  sections$?: Observable<ILocation[]>;
  registerForm!: FormGroup;
  apiError: string = '';

  get id(): FormControl {
    return this.registerForm.get('id') as FormControl;
  }
  get code(): FormControl {
    return this.registerForm.get('code') as FormControl;
  }

  get floor(): FormControl {
    return this.registerForm.get('floor') as FormControl;
  }

  get section(): FormControl {
    return this.registerForm.get('section') as FormControl;
  }

  get qty(): FormControl {
    return this.registerForm.get('qty') as FormControl;
  }

  constructor(private productsService: ProductsService,
              private route:ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchFloors();
    this.fetchSections();
    const { id } = this.route.snapshot.params
    if (id) {
      this.fetchCourse(id);
    } else {
      this.registerForm = this.fb.group({
        id:  new FormControl(),
        code: new FormControl('', [Validators.required,
          Validators.pattern("[A-Z]{2,4} [0-9]{4,6}")]),
        floor: new FormControl('', [Validators.required]),
        section: new FormControl('', [Validators.required]),
        qty: new FormControl('', [Validators.required,
          Validators.pattern("^[0-9]*$")])
      });
    }
  }

  private fetchCourse(id: string) {
    this.product$ = this.productsService.getProduct(id).subscribe((product: IProduct) => {
      this.registerForm = this.fb.group({
        id:  new FormControl(product.id),
        code: new FormControl({value: product.code, disabled: true}),
        floor: new FormControl(product.floor, [Validators.required]),
        section: new FormControl(product.section, [Validators.required,]),
        qty: new FormControl(product.qty, [Validators.required,
          Validators.pattern("^[0-9]*$")])
      });
    });
  }

  onSubmit() {
    this.apiError = ''
    let { id, floor, section, qty } = this.registerForm.value;
    const code = this.registerForm.controls['code'].value
    const product: IProduct = {
      id,
      code,
      floor: +floor,
      section: +section,
      qty: +qty
    }
    if (id) {
      this.productsService.updateProduct(product).subscribe(res => {
        if (res === 'occupied') {
          this.apiError = 'Location if occupied'
        } else if (res === 'missing') {
          this.apiError = 'Missing product'
        } else {
          this.router.navigateByUrl(``)
        }
      })
    } else {
      this.productsService.saveProduct(product)
        .subscribe(res => {
        if (res === 'exist') {
          this.apiError = `Product code isn't unique`
        } else if (res === 'occupied') {
          this.apiError =  'Location is occupied'
        } else {
          this.router.navigateByUrl(``)
        }
      })
    }
  }

  private fetchFloors() {
    this.floors$ = this.productsService.getFloors();
  }

  private fetchSections() {
    this.sections$ = this.productsService.getSections();
  }
}
