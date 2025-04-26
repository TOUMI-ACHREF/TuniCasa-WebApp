import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateCardComponent } from './estate-card.component';

describe('EstateCardComponent', () => {
  let component: EstateCardComponent;
  let fixture: ComponentFixture<EstateCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstateCardComponent]
    });
    fixture = TestBed.createComponent(EstateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
