import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratFormComponent } from './contrat-form.component';

describe('ContratFormComponent', () => {
  let component: ContratFormComponent;
  let fixture: ComponentFixture<ContratFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContratFormComponent]
    });
    fixture = TestBed.createComponent(ContratFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
