import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FattureClientiComponent } from './invoices-customers.component';

describe('FattureClientiComponent', () => {
  let component: FattureClientiComponent;
  let fixture: ComponentFixture<FattureClientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FattureClientiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FattureClientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
