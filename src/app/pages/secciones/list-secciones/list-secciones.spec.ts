import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSecciones } from './list-secciones';

describe('ListSecciones', () => {
  let component: ListSecciones;
  let fixture: ComponentFixture<ListSecciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSecciones],
    }).compileComponents();

    fixture = TestBed.createComponent(ListSecciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
