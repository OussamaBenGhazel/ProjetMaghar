import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOffresEmploiComponent } from './liste-offres-emploi.component';

describe('ListeOffresEmploiComponent', () => {
  let component: ListOffresEmploiComponent;
  let fixture: ComponentFixture<ListOffresEmploiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOffresEmploiComponent]
    });
    fixture = TestBed.createComponent(ListOffresEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
