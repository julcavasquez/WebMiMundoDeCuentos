import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnios } from './list-anios';

describe('ListAnios', () => {
  let component: ListAnios;
  let fixture: ComponentFixture<ListAnios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAnios],
    }).compileComponents();

    fixture = TestBed.createComponent(ListAnios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
