import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLeftComponent } from './time-left.component';

describe('TimeLeftComponent', () => {
  let component: TimeLeftComponent;
  let fixture: ComponentFixture<TimeLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
