import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpCheckboxComponent } from './mp-checkbox.component';

describe('MpCheckboxComponent', () => {
  let component: MpCheckboxComponent;
  let fixture: ComponentFixture<MpCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
