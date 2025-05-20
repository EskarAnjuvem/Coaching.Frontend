import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperGenerateComponent } from './paper-generate.component';

describe('PaperGenerateComponent', () => {
  let component: PaperGenerateComponent;
  let fixture: ComponentFixture<PaperGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperGenerateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
