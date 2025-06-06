import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMarksEntryComponent } from './student-marks-entry.component';

describe('StudentMarksEntryComponent', () => {
  let component: StudentMarksEntryComponent;
  let fixture: ComponentFixture<StudentMarksEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMarksEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMarksEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
