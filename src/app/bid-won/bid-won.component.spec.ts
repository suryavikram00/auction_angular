import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidWonComponent } from './bid-won.component';

describe('BidWonComponent', () => {
  let component: BidWonComponent;
  let fixture: ComponentFixture<BidWonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidWonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidWonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
