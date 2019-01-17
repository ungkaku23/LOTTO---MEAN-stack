import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageMessageComponent } from './mypage-message.component';

describe('MypageMessageComponent', () => {
  let component: MypageMessageComponent;
  let fixture: ComponentFixture<MypageMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypageMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
