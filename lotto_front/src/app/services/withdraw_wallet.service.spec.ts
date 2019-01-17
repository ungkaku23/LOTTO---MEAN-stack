import { TestBed, inject } from '@angular/core/testing';

import { WithdrawWalletService } from './withdraw_wallet.service';

describe('WithdrawWalletService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WithdrawWalletService]
    });
  });

  it('should be created', inject([WithdrawWalletService], (service: WithdrawWalletService) => {
    expect(service).toBeTruthy();
  }));
});
