import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedestinationComponent } from './updatedestination.component';

describe('UpdatedestinationComponent', () => {
  let component: UpdatedestinationComponent;
  let fixture: ComponentFixture<UpdatedestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatedestinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatedestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
