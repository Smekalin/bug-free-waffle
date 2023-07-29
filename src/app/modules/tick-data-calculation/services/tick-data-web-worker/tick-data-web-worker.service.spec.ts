import { TestBed } from '@angular/core/testing';

import { TickDataWebWorkerService } from './tick-data-web-worker.service';

describe('TickDataWebWorkerService', () => {
  let service: TickDataWebWorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TickDataWebWorkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
