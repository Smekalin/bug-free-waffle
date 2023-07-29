import { TestBed } from '@angular/core/testing';

import { TickInfoWebsocketService } from './tick-info-websocket.service';

describe('TickInfoWebsocketService', () => {
  let service: TickInfoWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TickInfoWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
