import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegAnioLectivo } from './reg-anio-lectivo';

describe('RegAnioLectivo', () => {
  let component: RegAnioLectivo;
  let fixture: ComponentFixture<RegAnioLectivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegAnioLectivo],
    }).compileComponents();

    fixture = TestBed.createComponent(RegAnioLectivo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
