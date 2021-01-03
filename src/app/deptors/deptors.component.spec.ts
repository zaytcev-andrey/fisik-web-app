import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptorsComponent } from './deptors.component';

describe('DeptorsComponent', () => {
  let component: DeptorsComponent;
  let fixture: ComponentFixture<DeptorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
