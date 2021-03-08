import { TestBed } from '@angular/core/testing';

import { DebtorsInteractionService } from './debtors-interaction.service';

describe('DebtorsInteractionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DebtorsInteractionService = TestBed.get(DebtorsInteractionService);
    expect(service).toBeTruthy();
  });
});
