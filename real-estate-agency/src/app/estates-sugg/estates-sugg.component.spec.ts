import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatesSuggComponent } from './estates-sugg.component';

describe('EstatesSuggComponent', () => {
  let component: EstatesSuggComponent;
  let fixture: ComponentFixture<EstatesSuggComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstatesSuggComponent]
    });
    fixture = TestBed.createComponent(EstatesSuggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
