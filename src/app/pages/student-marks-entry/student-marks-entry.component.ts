import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface StudentMarkDTO {
  studentId: number;
  studentName: string;
  examRecordId: number;
  marksObtained: number;
}

interface ExamRecordDTO {
  id: number
  examName: string;
  examSubject: string;
  examMarks: number;
  examDate: string;        // or Date
  examLevel: string;
  examDescription: string;
}

@Component({
  selector: 'app-student-marks-entry',
  imports: [FormsModule, NgFor],
  templateUrl: './student-marks-entry.component.html',
  styleUrl: './student-marks-entry.component.css'
})
export class StudentMarksEntryComponent implements OnInit {
  markList: StudentMarkDTO[] = [];
  examDetails!: ExamRecordDTO;
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
      data.sort((a:StudentMarkDTO,b:StudentMarkDTO)=> a.studentName.toLowerCase().localeCompare(b.studentName.toLowerCase()));
      this.markList = data;
    });

    this.http.get<ExamRecordDTO>("https://academyofphysics-production.up.railway.app/api/ExamRecord/examDetails", { params: { id: this.examId } }).subscribe({
      next: (data) => { this.examDetails = data },
      error: (err) => { }
    });
  }

  submitMarks() {
    this.http.post('https://academyofphysics-production.up.railway.app/api/studentmark/batchSubmit', this.markList).subscribe(() => {
      alert('Marks submitted successfully!');
    });
  }

  downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Exam Report",14,15);

    doc.setFontSize(12);
    const exam = this.examDetails;

    doc.text(`${exam.examSubject}`, 14, 30);
    doc.text(`Exam Name: ${exam.examName}`, 70, 30);       // X shifted to the right
    doc.text(`Exam Date: ${exam.examDate}`, 14, 40);
    doc.text(`Total Marks: ${exam.examMarks}`, 70, 40); // Adjust spacing as needed
    doc.text(`Level : ${exam.examLevel}`,130,40);

    // Second row: Description (spanning full width)
    doc.text(`Description: ${exam.examDescription}`, 14, 50);

    const sortedList = [...this.markList]
      .filter( item => item.marksObtained != 0)
      .sort((a, b) => b.marksObtained - a.marksObtained);
    
    const headers = [['Sl.No.', 'Name', 'Marks']];
    const rows = sortedList.map((s,index) => [index+1, s.studentName, s.marksObtained]);

    autoTable(doc, {
      startY: 60,
      head: headers,
      body: rows,
      theme: 'grid'
    });

    doc.save('Student_Report.pdf');
  }



}
