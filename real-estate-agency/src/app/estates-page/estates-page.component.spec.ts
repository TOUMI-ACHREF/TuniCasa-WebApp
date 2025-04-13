import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatesPageComponent } from './estates-page.component';

describe('EstatesPageComponent', () => {
  let component: EstatesPageComponent;
  let fixture: ComponentFixture<EstatesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstatesPageComponent]
    });
    fixture = TestBed.createComponent(EstatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
