import { TestBed } from '@angular/core/testing';

import { DemandeAssistanceService } from './demandeassistance.service';

describe('DemandeAssistanceService', () => {
  let service: DemandeAssistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeAssistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
