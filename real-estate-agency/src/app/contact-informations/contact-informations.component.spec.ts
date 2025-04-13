import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInformationsComponent } from './contact-informations.component';

describe('ContactInformationsComponent', () => {
  let component: ContactInformationsComponent;
  let fixture: ComponentFixture<ContactInformationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactInformationsComponent]
    });
    fixture = TestBed.createComponent(ContactInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
