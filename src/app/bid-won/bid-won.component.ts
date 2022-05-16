import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-bid-won',
  templateUrl: './bid-won.component.html',
  styleUrls: ['./bid-won.component.css']
})
export class BidWonComponent implements OnInit {

  constructor(private productService : ProductService) { }

  wonProductList: any[] = [];

  ngOnInit(): void {
    this.showWonProductBid();
  }

  public showWonProductBid(){
    let productId: any;
    this.productService.retrieveWonProductBid()
      .subscribe(data => {
        console.log(data);
        for (var i = 0; i < data.result.length; i++) {
          this.wonProductList.push(data.result[i]);
        }
      });

  }

}
