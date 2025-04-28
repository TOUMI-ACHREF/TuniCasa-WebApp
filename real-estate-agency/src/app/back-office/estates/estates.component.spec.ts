import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estates2Component } from './estates.component';

describe('EstatesComponent', () => {
  let component: Estates2Component;
  let fixture: ComponentFixture<Estates2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Estates2Component]
    });
    fixture = TestBed.createComponent(Estates2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
