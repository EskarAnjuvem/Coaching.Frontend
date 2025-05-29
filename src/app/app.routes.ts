import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdmissionComponent } from './pages/admission/admission.component';
import { LoginComponent } from './pages/login/login.component';
import { PaperGenerateComponent } from './pages/paper-generate/paper-generate.component';
import { SchoolListComponent } from './pages/school-list/school-list.component';
import { StudentListComponent } from './pages/student-list/student-list.component';

export const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'admission', component: AdmissionComponent },
    { path: '', redirectTo: 'about', pathMatch: 'full' },
    { path: 'paper-generate', component: PaperGenerateComponent },
    { path: 'school-list', component: SchoolListComponent },
    { path: 'login', component: LoginComponent },
    {
        path: '', component: AdminHomeComponent,
        children: [
            { path: 'student-list', component: StudentListComponent }
        ]
    }
];
