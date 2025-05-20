import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AdmissionComponent } from './pages/admission/admission.component';
import { PaperGenerateComponent } from './pages/paper-generate/paper-generate.component';
import { SchoolListComponent } from './pages/school-list/school-list.component';

export const routes: Routes = [
    { path: 'about', component: AboutComponent},
    { path: 'admission', component: AdmissionComponent},
    { path: '', redirectTo:'about', pathMatch : 'full'},
    { path: 'paper-generate', component: PaperGenerateComponent},
    { path: 'school-list', component: SchoolListComponent}
];
