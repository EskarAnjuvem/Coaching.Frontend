import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdmissionComponent } from './pages/admission/admission.component';
import { CreateExamComponent } from './pages/create-exam/create-exam.component';
import { EditIndividualComponent } from './pages/edit-individual/edit-individual.component';
import { EditStudentRecordComponent } from './pages/edit-student-record/edit-student-record.component';
import { LoginComponent } from './pages/login/login.component';
import { PaperGenerateComponent } from './pages/paper-generate/paper-generate.component';
import { SchoolListComponent } from './pages/school-list/school-list.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentMarksEntryComponent } from './pages/student-marks-entry/student-marks-entry.component';

export const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'admission', component: AdmissionComponent },
    { path: '', redirectTo: 'about', pathMatch: 'full' },
    { path: 'paper-generate', component: PaperGenerateComponent },
    { path: 'school-list', component: SchoolListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin-home', component: AdminHomeComponent,
        children: [
            { path: 'student-list', component: StudentListComponent },
            { path: 'create-exam', component: CreateExamComponent},
            { path: 'edit-student-record', component:EditStudentRecordComponent},
            { path: 'student-marks-entry/:examId/:batchStartYear', component:StudentMarksEntryComponent},
            { path: 'edit-individual/:enteredId', component:EditIndividualComponent}
        ]
    }
];
