import { TestBed } from '@angular/core/testing';

import { RoomValueService } from './room-value-service';

describe('RoomValueService', () => {
  let service: RoomValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
