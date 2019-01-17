import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitTabsComponent } from './bit-tabs.component';

describe('BitTabsComponent', () => {
  let component: BitTabsComponent;
  let fixture: ComponentFixture<BitTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
