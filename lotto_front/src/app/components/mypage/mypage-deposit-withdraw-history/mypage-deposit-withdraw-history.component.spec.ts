import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageDepositWithdrawHistoryComponent } from './mypage-deposit-withdraw-history.component';

describe('MypageDepositWithdrawHistoryComponent', () => {
  let component: MypageDepositWithdrawHistoryComponent;
  let fixture: ComponentFixture<MypageDepositWithdrawHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypageDepositWithdrawHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageDepositWithdrawHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
