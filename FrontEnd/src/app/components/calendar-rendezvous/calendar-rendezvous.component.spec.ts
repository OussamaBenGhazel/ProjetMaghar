import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarRendezVousComponent } from './calendar-rendezvous.component';


describe('CalendarRendezvousComponent', () => {
  let component: CalendarRendezVousComponent;
  let fixture: ComponentFixture<CalendarRendezVousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarRendezVousComponent]
    });
    fixture = TestBed.createComponent(CalendarRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
