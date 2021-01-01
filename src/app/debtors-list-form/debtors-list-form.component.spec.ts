import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsListFormComponent } from './debtors-list-form.component';

describe('DebtorsListFormComponent', () => {
  let component: DebtorsListFormComponent;
  let fixture: ComponentFixture<DebtorsListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtorsListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtorsListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
