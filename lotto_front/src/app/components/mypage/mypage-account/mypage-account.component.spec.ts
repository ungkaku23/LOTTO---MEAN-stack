import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageAccountComponent } from './mypage-account.component';

describe('MypageAccountComponent', () => {
  let component: MypageAccountComponent;
  let fixture: ComponentFixture<MypageAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypageAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
