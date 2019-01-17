import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageSettingsComponent } from './mypage-settings.component';

describe('MypageSettingsComponent', () => {
  let component: MypageSettingsComponent;
  let fixture: ComponentFixture<MypageSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypageSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
