import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BHomeComponent } from './b-home.component';

describe('BHomeComponent', () => {
  let component: BHomeComponent;
  let fixture: ComponentFixture<BHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
