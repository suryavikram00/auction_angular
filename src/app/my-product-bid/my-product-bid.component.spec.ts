import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductBidComponent } from './my-product-bid.component';

describe('MyProductBidComponent', () => {
  let component: MyProductBidComponent;
  let fixture: ComponentFixture<MyProductBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProductBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProductBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
