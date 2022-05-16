import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ShowAllProductComponent } from '../show-all-product/show-all-product.component';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.css']
})
export class MyProductComponent implements OnInit {

  constructor(private productService : ProductService) { }

  productList: any[] = [];

  ngOnInit(): void {
    this.showMyProduct();
  }

  public showMyProduct(){
    let productId: any;
    this.productService.retrieveMyProduct()
      .subscribe(data => {
        console.log(data);
        for (var i = 0; i < data.result.length; i++) {
          this.productList.push(data.result[i]);
        }
      });

  }

  

}
