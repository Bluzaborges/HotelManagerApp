import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { fineGuard } from './fine.guard';

describe('fineGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => fineGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
