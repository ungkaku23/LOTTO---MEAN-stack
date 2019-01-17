import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrowHistoryComponent } from './drow-history.component';

describe('DrowHistoryComponent', () => {
  let component: DrowHistoryComponent;
  let fixture: ComponentFixture<DrowHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrowHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrowHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
