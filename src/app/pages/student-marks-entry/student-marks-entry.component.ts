import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface StudentMarkDTO {
  studentId: number;
  studentName: string;
  examRecordId: number;
  marksObtained: number;
}

@Component({
  selector: 'app-student-marks-entry',
  imports: [FormsModule, NgFor],
  templateUrl: './student-marks-entry.component.html',
  styleUrl: './student-marks-entry.component.css'
})
export class StudentMarksEntryComponent implements OnInit {
  markList: StudentMarkDTO[] = [];
  examId!: number;
  batchStartYear!: number;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.examId = +this.route.snapshot.paramMap.get('examId')!;
    this.batchStartYear = +this.route.snapshot.paramMap.get('batchStartYear')!;

    this.http.get<StudentMarkDTO[]>(
      `https://academyofphysics-production.up.railway.app/api/studentmark/byExamAndBatch`,
      { params: { examId: this.examId, batchStartYear: this.batchStartYear } }
    ).subscribe(data => {
      this.markList = data;
    });
  }

  submitMarks() {
    this.http.post('https://academyofphysics-production.up.railway.app/api/studentmark/batchSubmit', this.markList).subscribe(() => {
      alert('Marks submitted successfully!');
    });
  }
}
