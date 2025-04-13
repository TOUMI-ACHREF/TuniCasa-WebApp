import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatesInformationComponent } from './estates-information.component';

describe('EstatesInformationComponent', () => {
  let component: EstatesInformationComponent;
  let fixture: ComponentFixture<EstatesInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstatesInformationComponent]
    });
    fixture = TestBed.createComponent(EstatesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
