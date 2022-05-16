import { Component } from '@angular/core';
import { LocalStorageUtils } from './utils/local-storage-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auction';

  constructor(private localStorageUtils: LocalStorageUtils) { }

  signout() {
    this.localStorageUtils.clearJwtToken();
  }

  isUserLoggedIn(): Boolean {
    // alert(this.localStorageUtils.getJwtToken());
    if (this.localStorageUtils.getJwtToken() == null || this.localStorageUtils.getJwtToken() == undefined ) {
      return false;
    } else {
      return true;
    }
  }

}
