import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckFairPlayComponent } from './check-fair-play.component';

describe('CheckFairPlayComponent', () => {
  let component: CheckFairPlayComponent;
  let fixture: ComponentFixture<CheckFairPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckFairPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckFairPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
