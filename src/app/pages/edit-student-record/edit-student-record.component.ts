import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-student-record',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './edit-student-record.component.html',
  styleUrl: './edit-student-record.component.css'
})
export class EditStudentRecordComponent {
  selectedExamId: number | string = '';
  currentYear: number = new Date().getFullYear();
  startYears: number[] = [];
  isChecked: boolean = false;
  editMode: string = '';
  selectedYear: string = '';
  selectedProperty: string = '';
  examRecords: any[] = [];
  router = inject(Router);
  selectedExam: any = null;
  enteredId : number | string = '';

  http = inject(HttpClient);

  ngOnInit(): void {
    for (let year = this.currentYear - 3; year <= this.currentYear + 2; year++) {
      this.startYears.push(year);
    }

    this.http.get<any[]>("https://academyofphysics-production.up.railway.app/api/ExamRecord").subscribe({
      next: (data) => {
        this.examRecords = data;
        console.log(this.examRecords);

      },
      error: (err) => {
        console.error('Error fetching records'); 
      }
    });
  }

  OnEditChoice() {
    if (this.editMode === "batchYear") {      
      this.router.navigate(['/admin-home/student-marks-entry', this.selectedExamId, this.selectedYear]);
    }
    else if (this.editMode === "studentId"){
      
      this.router.navigate(['admin-home/edit-individual',this.enteredId]);
    }


  }

}
