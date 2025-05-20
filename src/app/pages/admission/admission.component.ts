import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { School } from '../../models/school.model';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-admission',
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.css'
})
export class AdmissionComponent implements OnInit {

  http = inject(HttpClient);
  apiUrl = "academyofphysics-production.up.railway.app/api";
  currentYear : number = new Date().getFullYear();
  withinYearRange: boolean = true;
  startYears: number[] = [];
  schools: School[] = [];
  isSchoolLoaded : boolean = false;
  isSubmitting: boolean = false;
  sucessMessage: string | null = null;
  errorMessage: string | null = null;

  studentDetails: any = {
    "id": 0,
    "firstName": "",
    "lastName": "",
    "gender": "",
    "email": "",
    "dateOfBirth": "",
    "contactNumber": "",
    "enrolledBatch": "",
    "schoolId": ""
  }
  constructor(private schoolService: SchoolService) { }

  ngOnInit(): void {    
    for (let year = this.currentYear - 3; year <= this.currentYear + 2; year++) {
      this.startYears.push(year);
    }
    this.schoolService.getSchools().subscribe({
      next: (data) => {
        this.isSchoolLoaded = true;
        data.sort((a: School, b: School) => a.schoolName.toLowerCase().localeCompare(b.schoolName.toLowerCase()));        
        this.schools = data;        
      },
      error: (err) => {
        this.isSchoolLoaded = false;
        console.error('Error Fetching schools', err);
      } 
    });
  }

  studentForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(2)]),
    gender: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    dateOfBirth: new FormControl("", [Validators.required]),
    contactNumber: new FormControl("", [Validators.required, Validators.pattern('[0-9]{10}')]),
    batchStartYear: new FormControl(null, [Validators.required]),
    schoolId: new FormControl("", [Validators.required]),
  });
  
  onDateChange(event: any) {
    const selectedDate = new Date(event.target.value);
    const year = selectedDate.getFullYear();
    const minYear = this.currentYear - 18;
    const maxYear = this.currentYear - 13;
    this.withinYearRange = (year >= minYear && year <= maxYear);
  }

  onSaveUser() {
    if (this.studentForm.invalid || !this.withinYearRange) return;
    const formValue = this.studentForm.value;
    this.isSubmitting = true;
    this.studentForm.disable();
    this.http.post("${apiUrl}/StudentList", formValue)
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;
          this.sucessMessage = "Student Record entered successfully!";
          this.errorMessage = null;
          this.studentForm.reset();

        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = "An error occurred while submitting the form.";
          this.sucessMessage = null;

        }
      });
  }

  onAddAnother() {
    this.sucessMessage = null;
    this.errorMessage = null;
    this.studentForm.reset();
  }

  retryOnError() {
    this.studentForm.reset();
    this.errorMessage = null;
    this.studentForm.enable();
  }

}
