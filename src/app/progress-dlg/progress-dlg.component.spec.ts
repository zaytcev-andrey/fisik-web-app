import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDlgComponent } from './progress-dlg.component';

describe('ProgressDlgComponent', () => {
  let component: ProgressDlgComponent;
  let fixture: ComponentFixture<ProgressDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
