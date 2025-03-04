import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContratAdminComponent } from './list-contrat-admin.component';

describe('ListContratAdminComponent', () => {
  let component: ListContratAdminComponent;
  let fixture: ComponentFixture<ListContratAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListContratAdminComponent]
    });
    fixture = TestBed.createComponent(ListContratAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
