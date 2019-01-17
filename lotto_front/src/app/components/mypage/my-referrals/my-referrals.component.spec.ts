import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReferralsComponent } from './my-referrals.component';

describe('MyReferralsComponent', () => {
  let component: MyReferralsComponent;
  let fixture: ComponentFixture<MyReferralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReferralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReferralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
