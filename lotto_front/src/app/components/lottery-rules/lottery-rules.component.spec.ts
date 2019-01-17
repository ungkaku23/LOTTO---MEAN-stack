import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryRulesComponent } from './lottery-rules.component';

describe('LotteryRulesComponent', () => {
  let component: LotteryRulesComponent;
  let fixture: ComponentFixture<LotteryRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
