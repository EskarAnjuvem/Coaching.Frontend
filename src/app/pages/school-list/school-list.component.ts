import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { School } from '../../models/school.model';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-school-list',
  imports: [NgIf, NgFor],
  templateUrl: './school-list.component.html',
  styleUrl: './school-list.component.css'
})
export class SchoolListComponent implements OnInit {
  schools: School[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(private schoolService: SchoolService) { }


  ngOnInit(): void {
    this.schoolService.getSchools().subscribe({
      next: (data) => {
        data.sort((a: School, b: School) => a.schoolName.toLowerCase().localeCompare(b.schoolName.toLowerCase())),
        this.schools = data,
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.errorMessage = "Server Error : List can't be loaded right now."
      }
    });
  }

}
