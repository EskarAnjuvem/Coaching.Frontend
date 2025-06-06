import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-exam',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.css'
})
export class CreateExamComponent {

  http = inject(HttpClient);
  isSubmitting: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  examDetailsForm: FormGroup = new FormGroup({
    examName: new FormControl("", [Validators.required]),
    examMarks: new FormControl("", [Validators.required]),
    examDate: new FormControl("", [Validators.required]),
    examDescription: new FormControl(""),
    examLevel: new FormControl("", [Validators.required])
  });

  onSaveExam() {

    if (this.examDetailsForm.invalid) return;

    const formValue = this.examDetailsForm.value;
    this.isSubmitting = true;

    this.http.post("https://academyofphysics-production.up.railway.app/api/ExamRecord", formValue)
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;
          this.examDetailsForm.reset();
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = err.error?.error;

        }
      });

  }

}
