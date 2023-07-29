import { TestBed } from '@angular/core/testing';

import { TickDataFallbackService } from './tick-data-fallback.service';

describe('TickDataFallbackService', () => {
  let service: TickDataFallbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TickDataFallbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
