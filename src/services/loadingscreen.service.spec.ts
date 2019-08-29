import { TestBed } from '@angular/core/testing';

import { LoadingscreenService } from './loadingscreen.service';

describe('LoadingscreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingscreenService = TestBed.get(LoadingscreenService);
    expect(service).toBeTruthy();
  });
});
