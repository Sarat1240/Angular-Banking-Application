import { TestBed } from '@angular/core/testing';

import { BankService } from './bank.service';
import { HttpClientModule } from '@angular/common/http';

describe('BankService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: BankService = TestBed.get(BankService);
    expect(service).toBeTruthy();
  });
});
