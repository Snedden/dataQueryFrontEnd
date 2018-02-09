import { TestBed, inject } from '@angular/core/testing';

import { DbColumnServiceService } from './db-column-service.service';

describe('DbColumnServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbColumnServiceService]
    });
  });

  it('should be created', inject([DbColumnServiceService], (service: DbColumnServiceService) => {
    expect(service).toBeTruthy();
  }));
});
