import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartenaireListComponent } from './partenaire-list.component';

describe('PartenaireListComponent', () => {
  let component: PartenaireListComponent;
  let fixture: ComponentFixture<PartenaireListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartenaireListComponent]
    });
    fixture = TestBed.createComponent(PartenaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
