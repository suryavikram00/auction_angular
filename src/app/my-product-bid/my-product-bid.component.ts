import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-my-product-bid',
  templateUrl: './my-product-bid.component.html',
  styleUrls: ['./my-product-bid.component.css']
})
export class MyProductBidComponent implements OnInit {

  constructor(private productService: ProductService) {
    this.showMyProductBid();
  }

  productBidList: any[] = [];
  productList : any[] = [];


  ngOnInit(): void {
  }

  public showMyProductBid() {
    this.productService.retrieveMyProductBid()
      .subscribe(data => {
        console.log(data);
        console.log(data.result[0].product);        
        for (var i = 0; i < data.result.length; i++) {          
          this.productList.push[data.result[i].product];
          this.productBidList.push(data.result[i]);
        }
      });

  }

}
