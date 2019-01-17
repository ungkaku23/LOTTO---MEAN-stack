import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageLotteryResultsComponent } from './mypage-lottery-results.component';

describe('MypageLotteryResultsComponent', () => {
  let component: MypageLotteryResultsComponent;
  let fixture: ComponentFixture<MypageLotteryResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypageLotteryResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageLotteryResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
