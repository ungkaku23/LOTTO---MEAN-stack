import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bet4RulesComponent } from './bet4-rules.component';

describe('Bet4RulesComponent', () => {
  let component: Bet4RulesComponent;
  let fixture: ComponentFixture<Bet4RulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bet4RulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bet4RulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
