import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffrePartenaireFormComponent } from './offre-partenaire-form.component';

describe('OffrePartenaireFormComponent', () => {
  let component: OffrePartenaireFormComponent;
  let fixture: ComponentFixture<OffrePartenaireFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffrePartenaireFormComponent]
    });
    fixture = TestBed.createComponent(OffrePartenaireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
