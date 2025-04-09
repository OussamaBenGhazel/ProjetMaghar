import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffrePartenaireEditComponent } from './offre-partenaire-edit.component';

describe('OffrePartenaireEditComponent', () => {
  let component: OffrePartenaireEditComponent;
  let fixture: ComponentFixture<OffrePartenaireEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffrePartenaireEditComponent]
    });
    fixture = TestBed.createComponent(OffrePartenaireEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
