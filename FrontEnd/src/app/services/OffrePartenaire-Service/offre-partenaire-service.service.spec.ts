import { TestBed } from '@angular/core/testing';

import { OffrePartenaireServiceService } from './offre-partenaire-service.service';

describe('OffrePartenaireServiceService', () => {
  let service: OffrePartenaireServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffrePartenaireServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
