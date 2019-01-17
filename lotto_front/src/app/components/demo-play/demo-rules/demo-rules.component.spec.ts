import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoRulesComponent } from './demo-rules.component';

describe('DemoRulesComponent', () => {
  let component: DemoRulesComponent;
  let fixture: ComponentFixture<DemoRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
