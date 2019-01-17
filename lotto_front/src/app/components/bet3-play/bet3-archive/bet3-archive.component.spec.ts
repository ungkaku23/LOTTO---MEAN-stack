import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bet3ArchiveComponent } from './bet3-archive.component';

describe('Bet3ArchiveComponent', () => {
  let component: Bet3ArchiveComponent;
  let fixture: ComponentFixture<Bet3ArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bet3ArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bet3ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
