import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bet4ArchiveComponent } from './bet4-archive.component';

describe('Bet4ArchiveComponent', () => {
  let component: Bet4ArchiveComponent;
  let fixture: ComponentFixture<Bet4ArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bet4ArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bet4ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
