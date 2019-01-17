import { TestBed, inject } from '@angular/core/testing';

import { LotteryService } from './lottery.service';

describe('LotteryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LotteryService]
    });
  });

  it('should be created', inject([LotteryService], (service: LotteryService) => {
    expect(service).toBeTruthy();
  }));
});
