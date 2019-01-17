import { TestBed, inject } from '@angular/core/testing';

import { LotoAuthService } from './auth.service';

describe('LotoAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LotoAuthService]
    });
  });

  it('should be created', inject([LotoAuthService], (service: LotoAuthService) => {
    expect(service).toBeTruthy();
  }));
});
