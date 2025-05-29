import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);
  http = inject(HttpClient);
  private loginSuccess : boolean = false;
  adminObject : any = {
    emailId : "",
    password: ""
  }

  onLogin(){
    this.http.post("https://academyofphysics-production.up.railway.app/api/AdminLogin",this.adminObject).subscribe({
      next:(data : any) => {
        this.loginSuccess = true;
        this.router.navigateByUrl("student-list");
      },
      error: (err) => {
        this.loginSuccess = false;
        if (err.school === 401){
          err.error.message;
        }
      }
    });
  }
}
