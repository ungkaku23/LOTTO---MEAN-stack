import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawDetailComponent } from './draw-detail.component';

describe('DrawDetailComponent', () => {
  let component: DrawDetailComponent;
  let fixture: ComponentFixture<DrawDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
