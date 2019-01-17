import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageDepositWithdrawComponent } from './mypage-deposit-withdraw.component';

describe('MypageDepositWithdrawComponent', () => {
  let component: MypageDepositWithdrawComponent;
  let fixture: ComponentFixture<MypageDepositWithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypageDepositWithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageDepositWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
