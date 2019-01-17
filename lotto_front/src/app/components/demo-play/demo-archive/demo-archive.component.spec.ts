import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoArchiveComponent } from './demo-archive.component';

describe('DemoArchiveComponent', () => {
  let component: DemoArchiveComponent;
  let fixture: ComponentFixture<DemoArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
