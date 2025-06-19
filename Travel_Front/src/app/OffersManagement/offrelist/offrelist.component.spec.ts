import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffrelistComponent } from './offrelist.component';

describe('OffrelistComponent', () => {
  let component: OffrelistComponent;
  let fixture: ComponentFixture<OffrelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffrelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffrelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
