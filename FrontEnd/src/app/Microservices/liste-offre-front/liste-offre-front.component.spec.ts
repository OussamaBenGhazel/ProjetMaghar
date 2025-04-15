import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOffreFrontComponent } from './liste-offre-front.component';

describe('ListeOffreFrontComponent', () => {
  let component: ListeOffreFrontComponent;
  let fixture: ComponentFixture<ListeOffreFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeOffreFrontComponent]
    });
    fixture = TestBed.createComponent(ListeOffreFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
