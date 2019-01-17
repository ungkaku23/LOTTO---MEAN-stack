import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoBuyticketComponent } from './demo-buyticket.component';

describe('DemoBuyticketComponent', () => {
  let component: DemoBuyticketComponent;
  let fixture: ComponentFixture<DemoBuyticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoBuyticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoBuyticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
