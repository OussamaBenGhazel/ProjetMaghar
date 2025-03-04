import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcontratclientComponent } from './listcontratclient.component';

describe('ListcontratclientComponent', () => {
  let component: ListcontratclientComponent;
  let fixture: ComponentFixture<ListcontratclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListcontratclientComponent]
    });
    fixture = TestBed.createComponent(ListcontratclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
