import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationsFormsComponentComponent } from './reclamations-forms-component.component';

describe('ReclamationsFormsComponentComponent', () => {
  let component: ReclamationsFormsComponentComponent;
  let fixture: ComponentFixture<ReclamationsFormsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReclamationsFormsComponentComponent]
    });
    fixture = TestBed.createComponent(ReclamationsFormsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
