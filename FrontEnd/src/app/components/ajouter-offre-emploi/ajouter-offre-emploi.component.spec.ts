import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterOffreEmploiComponent } from './ajouter-offre-emploi.component';

describe('AjouterOffreEmploiComponent', () => {
  let component: AjouterOffreEmploiComponent;
  let fixture: ComponentFixture<AjouterOffreEmploiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterOffreEmploiComponent]
    });
    fixture = TestBed.createComponent(AjouterOffreEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
