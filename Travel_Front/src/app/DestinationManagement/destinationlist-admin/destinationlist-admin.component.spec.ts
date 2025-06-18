import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationlistAdminComponent } from './destinationlist-admin.component';

describe('DestinationlistAdminComponent', () => {
  let component: DestinationlistAdminComponent;
  let fixture: ComponentFixture<DestinationlistAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationlistAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationlistAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
