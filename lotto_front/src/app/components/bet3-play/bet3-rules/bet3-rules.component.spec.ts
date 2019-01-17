import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bet3RulesComponent } from './bet3-rules.component';

describe('Bet3RulesComponent', () => {
  let component: Bet3RulesComponent;
  let fixture: ComponentFixture<Bet3RulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bet3RulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bet3RulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
