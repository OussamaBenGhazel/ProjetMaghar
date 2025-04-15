import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRendezVousComponent } from './list-rendezvous.component';

describe('ListRendezvousComponent', () => {
  let component: ListRendezVousComponent;
  let fixture: ComponentFixture<ListRendezVousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRendezVousComponent]
    });
    fixture = TestBed.createComponent(ListRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
