import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageMyhistoryComponent } from './mypage-myhistory.component';

describe('MypageMyhistoryComponent', () => {
  let component: MypageMyhistoryComponent;
  let fixture: ComponentFixture<MypageMyhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypageMyhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageMyhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
