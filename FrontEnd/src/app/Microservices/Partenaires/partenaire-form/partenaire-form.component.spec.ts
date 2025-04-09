import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartenaireFormComponent } from './partenaire-form.component';

describe('PartenaireFormComponent', () => {
  let component: PartenaireFormComponent;
  let fixture: ComponentFixture<PartenaireFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartenaireFormComponent]
    });
    fixture = TestBed.createComponent(PartenaireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
