import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarSeccion } from './gestionar-seccion';

describe('GestionarSeccion', () => {
  let component: GestionarSeccion;
  let fixture: ComponentFixture<GestionarSeccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarSeccion],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionarSeccion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
