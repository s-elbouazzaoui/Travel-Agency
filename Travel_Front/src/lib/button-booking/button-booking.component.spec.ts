import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBookingComponent } from './button-booking.component';

describe('ButtonBookingComponent', () => {
  let component: ButtonBookingComponent;
  let fixture: ComponentFixture<ButtonBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
