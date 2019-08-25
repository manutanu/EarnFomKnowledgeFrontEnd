import { TestBed } from '@angular/core/testing';

import { WebsocketdemoService } from './websocketdemo.service';

describe('WebsocketdemoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsocketdemoService = TestBed.get(WebsocketdemoService);
    expect(service).toBeTruthy();
  });
});
