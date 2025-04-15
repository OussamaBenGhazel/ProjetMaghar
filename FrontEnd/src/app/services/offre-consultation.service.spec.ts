import { TestBed } from '@angular/core/testing';

import { OffreConsultationService } from './offre-consultation.service';

describe('OffreConsultationService', () => {
  let service: OffreConsultationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffreConsultationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
