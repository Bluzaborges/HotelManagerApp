import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { attendantGuard } from './attendant.guard';

describe('attendantGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => attendantGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
