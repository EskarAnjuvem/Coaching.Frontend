import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  http = inject(HttpClient);
  students: any[] = [];

  ngOnInit(): void {
    this.http.get("https://academyofphysics-production.up.railway.app/api/Student").subscribe((res: any) => {
      this.students = res;
    });
  }

}
