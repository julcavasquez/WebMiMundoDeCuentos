import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegUsuarios } from './reg-usuarios';

describe('RegUsuarios', () => {
  let component: RegUsuarios;
  let fixture: ComponentFixture<RegUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegUsuarios],
    }).compileComponents();

    fixture = TestBed.createComponent(RegUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
