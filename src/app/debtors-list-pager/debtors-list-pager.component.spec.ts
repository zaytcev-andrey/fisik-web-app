import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsListPagerComponent } from './debtors-list-pager.component';

describe('DebtorsListPagerComponent', () => {
  let component: DebtorsListPagerComponent;
  let fixture: ComponentFixture<DebtorsListPagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtorsListPagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtorsListPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
