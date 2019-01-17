import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetVideoComponent } from './bet-video.component';

describe('BetVideoComponent', () => {
  let component: BetVideoComponent;
  let fixture: ComponentFixture<BetVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
