import { TestBed } from '@angular/core/testing';

import { EstateService } from './estates.service';

describe('EstatesService', () => {
  let service: EstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
