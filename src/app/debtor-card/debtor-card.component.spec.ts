import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorCardComponent } from './debtor-card.component';

describe('DebtorCardComponent', () => {
  let component: DebtorCardComponent;
  let fixture: ComponentFixture<DebtorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
