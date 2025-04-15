import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOffresComponent } from './map-offres.component';

describe('MapOffresComponent', () => {
  let component: MapOffresComponent;
  let fixture: ComponentFixture<MapOffresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapOffresComponent]
    });
    fixture = TestBed.createComponent(MapOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
