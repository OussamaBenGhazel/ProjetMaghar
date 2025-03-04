import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListassuranceclientComponent } from './listassuranceclient.component';

describe('ListassuranceclientComponent', () => {
  let component: ListassuranceclientComponent;
  let fixture: ComponentFixture<ListassuranceclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListassuranceclientComponent]
    });
    fixture = TestBed.createComponent(ListassuranceclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
