import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bet3BuyticketComponent } from './bet3-buyticket.component';

describe('Bet3BuyticketComponent', () => {
  let component: Bet3BuyticketComponent;
  let fixture: ComponentFixture<Bet3BuyticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bet3BuyticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bet3BuyticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
