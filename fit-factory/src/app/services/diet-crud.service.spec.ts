import { TestBed } from '@angular/core/testing';

import { DietCrudService } from './diet-crud.service';

describe('DietCrudServiceService', () => {
  let service: DietCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DietCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
