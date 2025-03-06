import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffrePartenaireListComponent } from './offre-partenaire-list.component';

describe('OffrePartenaireListComponent', () => {
  let component: OffrePartenaireListComponent;
  let fixture: ComponentFixture<OffrePartenaireListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffrePartenaireListComponent]
    });
    fixture = TestBed.createComponent(OffrePartenaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
