import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
declare var $: any;

@Component({
  selector: 'app-show-product',
  templateUrl: './show-all-product.component.html',
  styleUrls: ['./show-all-product.component.css']
})
export class ShowAllProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  productList: any[] = [];

  counter = "";

  // Update the count down every 1 second


  private noOfItemsToShowInitially: number = 10;
  // itemsToLoad - number of new items to be displayed
  private itemsToLoad: number = 10;
  // List that is going to be actually displayed to user
  // public productToShow = this.productList;
  // No need to call onScroll if full list has already been displayed
  public isFullListDisplayed: boolean = false;

  onScroll() {
    if (this.noOfItemsToShowInitially <= this.productList.length) {
      // Update ending position to select more items from the array
      this.noOfItemsToShowInitially += this.itemsToLoad;
      this.getAllProduct(Math.floor(this.noOfItemsToShowInitially / 10), this.itemsToLoad);
      console.log("scrolled");
    } else {
      this.isFullListDisplayed = true;
    }
  }
  countdownTimer() {

    let x = setInterval(function () {
      if(this.productList == undefined || this.productList == null){
        return;
      }
      for (var i = 0; i < this.productList.length; i++) {
        // Set the date we're counting down to
        let countDownDate = new Date(this.productList[i].expiryTime).getTime();
        // Get today's date and time
        let now = new Date().getTime();

        let expiryTime = countDownDate;
        // Find the distance between now and the count down date
        let distance = expiryTime - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        this.productList[i].expiryTime = days + "d " + hours + "h "
          + minutes + "m " + seconds + "s ";
        // $('#counter0').val(this.counter);
        console.log(this.productList[i].expiryTime);
        // If the count down is over, write some text 
        if (distance < 0) {
          clearInterval(this.x);
          this.productList[i].expiryTime = "EXPIRED";
        }
      }
    }, 1000);

  }

  name = "gii";

  ngOnInit(): void {
    this.getAllProduct(this.noOfItemsToShowInitially / 10, this.noOfItemsToShowInitially);
    

    
  }

  ngAfterViewInit(): void{
    
  }

  getAllProduct(page: number, quantity: number) {
    this.productService.retrieveAllProduct(page - 1, quantity).subscribe(data => {
      console.log(data);
      for (var i = 0; i < data.result.length; i++) {
        this.productList.push(data.result[i]);
      }
      // this.productToShow = this.productList;
      for (var i = 0; i < this.productList.length; i++) {
        $('#bid-amount' + i).val(this.productList[i].maximumBidAmount);
      }
      if (this.productList != undefined) {
        this.countdownTimer();
      }
      
    });
  }


  bidNowBtnClick(productId, i) {
    let index = i;
    let bidAmount = $('#bid-amount' + index).val();
    this.productService.addProductBid(productId, bidAmount)
      .subscribe(data => {
        this.productList[index].maximumBidAmount = data.result.amount;
        $("#message" + index).html(data.message);
      });
  }

  checkBidAmount(index)  : boolean{
    if (this.productList[index].maximumBidAmount >= $('#bid-amount' + index).val()) {
      $("#bid-now-btn" + index).prop("disabled", true);
      return false;
    } else {      
      $("#bid-now-btn" + index).prop("disabled", false);
      return true;
    }    
  }

  bidFocusIn(index) {
    $("#message" + index).html("");
    this.checkBidAmount(index);
  }

  bidFocusOut(index) {
    if(!this.checkBidAmount(index)){
      $("#message" + index).html("Enter Amount > Bid Amount!");
    }
  }
  bidKeyPress(event, index) {
    this.checkBidAmount(index);
  }
}
