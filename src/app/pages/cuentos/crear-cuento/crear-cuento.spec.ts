import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCuento } from './crear-cuento';

describe('CrearCuento', () => {
  let component: CrearCuento;
  let fixture: ComponentFixture<CrearCuento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCuento],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearCuento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
