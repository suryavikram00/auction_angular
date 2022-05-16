import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { ImageService } from '../service/image.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private productService: ProductService,
    private imageService: ImageService,
    private route: ActivatedRoute, ) { }

  @Input() productId: Number;

  productForm = new FormGroup({
    // id : new FormControl(''),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    minimumAmount: new FormControl('', [Validators.required]),
    productImages: new FormControl(''),
    productTag: new FormControl(''),
    expiryTime: new FormControl('', [Validators.required])
  });
  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get minimumAmount() { return this.productForm.get('minimumAmount'); }
  get productImages() { return this.productForm.get('productImages'); }
  get productTag() { return this.productForm.get('productTag'); }
  get expiryTime() { return this.productForm.get('expiryTime'); }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId');
    this.getLocation();
    if (productId != null) {
      this.editProduct(productId);
      return;
    }
  }

  addProduct() {
    let productId: any;
    this.productService.addProduct(this.productForm.value)
      .subscribe(data => {
        console.log(data);
        productId = data.result.id;
      });
    if (productId != undefined) {
      this.imageService.addImage(this.file, productId)
        .subscribe(data => console.log(data));
    }
  }
  file: File[] = [];

  onFileSelect(event: any) {
    this.file = [];
    for (var i = 0; i < event.target.files.length; i++) {
      this.file.push(event.target.files[i]);
    }
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {

    }
  }
  showPosition(position): void {
    // alert('Latitude: ' + position.coords.latitude + 'Longitude:' + position.coords.longitude);
  }

  editProduct(productId): void {
    this.productService.retrieveProduct(productId).subscribe(data => {
      console.log(data);
      this.productForm.controls['name'].setValue(data.result.name);
      this.productForm.controls['description'].setValue(data.result.description);
      this.productForm.controls['minimumAmount'].setValue(data.result.minimumAmount);
      // this.productForm.controls['tags'].setValue(data.result.minimumAmount); 
      $("#productName").prop("readonly", true);
      $("#productMinimumAmount").prop("readonly", true);
    });
  }

}
