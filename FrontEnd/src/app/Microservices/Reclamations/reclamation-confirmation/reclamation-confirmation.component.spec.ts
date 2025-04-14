import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationConfirmationComponent } from './reclamation-confirmation.component';

describe('ReclamationConfirmationComponent', () => {
  let component: ReclamationConfirmationComponent;
  let fixture: ComponentFixture<ReclamationConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReclamationConfirmationComponent]
    });
    fixture = TestBed.createComponent(ReclamationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
