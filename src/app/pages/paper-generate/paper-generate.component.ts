import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-paper-generate',
  imports: [ReactiveFormsModule, NgFor, NgIf, NgSelectModule, FormsModule],
  templateUrl: './paper-generate.component.html',
  styleUrl: './paper-generate.component.css'
})
export class PaperGenerateComponent {
  quizForm!: FormGroup;
  http = inject(HttpClient);
  availableTags: any[] = [];
  subjects: any[] = [];
  difficulties: any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.quizForm = this.fb.group({
      subjectId: ['', Validators.required],
      difficultyLevelId: [0, Validators.required],
      questionCount: [5, [Validators.required, Validators.min(1)]],
      tagIds: [[], this.atLeastOneTag],
      includeAnswers: [false]
    });

    this.http.get<any[]>("https://academyofphysics-production.up.railway.app/api/QuestionEntry/subjects")
      .subscribe(data => {
        data.sort((a, b) => a.subjectName.localeCompare(b.subjectName, undefined, { sensitivity: 'base' }));
        this.subjects = data;

        const defaultType = this.subjects.find(type => type.id === 1);
        this.quizForm.get('subjectId')?.setValue(defaultType.id);
      });

    this.http.get<any[]>("https://academyofphysics-production.up.railway.app/api/QuestionEntry/difficultyLevels")
      .subscribe(data => {
        data.sort((a, b) => a.levelName.localeCompare(b.levelName, undefined, { sensitivity: 'base' }));
        this.difficulties = data;
        
        const allOption = { id: 0, levelName: "All" };
        this.difficulties = [allOption, ...data];

        const defaultType = this.difficulties.find(level => level.id === 1);
        this.quizForm.get('difficultyLevelId')?.setValue(defaultType.id);
      });

    this.http.get<any[]>("https://academyofphysics-production.up.railway.app/api/TagReadWrite")
      .subscribe(data => {
        data.sort((a, b) => a.tagName.localeCompare(b.tagName, undefined, { sensitivity: 'base' }));
        this.availableTags = data;
      });
  }

  onSubmit() {
    const formValue = this.quizForm.value;

    let params = new HttpParams()
      .set('subjectId', formValue.subjectId)
      .set('difficultyId', formValue.difficultyLevelId ?? 0)
      .set('count', formValue.questionCount)
      .set('includeAnswers', formValue.includeAnswers);

    //.set('tagIds', formValue.tagIds.join(','));  // Convert array to CSV string -- dropped due to casting problem

    formValue.difficultyLevelIds.forEach((levelId:number)=>{
      params = params.append('difficultyLevelIds',levelId);
    });
    
    formValue.tagIds.forEach((tagId: number) => {
      params = params.append('tagIds', tagId);
    });

    this.http.get('https://academyofphysics-production.up.railway.app/api/PaperGenerator/generate-questions-pdf', {
      params,
      responseType: 'blob'
    }).subscribe(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'questions.pdf';
      link.click();
    });
  }

  atLeastOneTag(control: any) {
    const value = control.value;
    return value && value.length > 0 ? null : { atLeastOneTag: true };
  }
}
