import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bet4BuyticketComponent } from './bet4-buyticket.component';

describe('Bet4BuyticketComponent', () => {
  let component: Bet4BuyticketComponent;
  let fixture: ComponentFixture<Bet4BuyticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bet4BuyticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bet4BuyticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
