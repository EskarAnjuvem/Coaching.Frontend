import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-individual',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-individual.component.html',
  styleUrl: './edit-individual.component.css'
})
export class EditIndividualComponent implements OnInit {
  studentForm!: FormGroup;
  studentId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('enteredId'));

    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      contactNumber: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required],
      schoolId: ['']
    });

    this.loadStudentData();
  }

  loadStudentData(): void {
    this.http.get<any>(`https://academyofphysics-production.up.railway.app/api/Student/${this.studentId}`).subscribe({
      next: (data) => {
        this.studentForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          emailAddress: data.emailAddress,
          dateOfBirth: data.dateOfBirth,
          contactNumber: data.contactNumber,
          startYear: data.startYear,
          endYear: data.endYear,
          schoolId: data.schoolId
        });
      }
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) return;

    this.http.put(`https://academyofphysics-production.up.railway.app/api/Student/${this.studentId}`, this.studentForm.value).subscribe({
      next: () => alert('Student updated successfully'),
      error: (err) => alert('Update failed: ' + err.error?.error || 'Unknown error')
    });
  }
}
