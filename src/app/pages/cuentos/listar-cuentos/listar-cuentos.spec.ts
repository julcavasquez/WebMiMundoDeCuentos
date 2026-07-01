import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCuentos } from './listar-cuentos';

describe('ListarCuentos', () => {
  let component: ListarCuentos;
  let fixture: ComponentFixture<ListarCuentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCuentos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarCuentos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
