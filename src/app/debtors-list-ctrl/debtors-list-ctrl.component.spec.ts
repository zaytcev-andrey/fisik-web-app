import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsListCtrlComponent } from './debtors-list-ctrl.component';

describe('DebtorsListCtrlComponent', () => {
  let component: DebtorsListCtrlComponent;
  let fixture: ComponentFixture<DebtorsListCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtorsListCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtorsListCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
