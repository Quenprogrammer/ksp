import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {BasicDetailsComponent} from "./basic-details/basic-details.component";
import {EducationComponent} from "./education/education.component";
import {WorkedExperienceComponent} from "./worked-experience/worked-experience.component";
import {SkillsComponent} from "./skills/skills.component";
import {JobTypeComponent} from "./job-type/job-type.component";

@Component({
  selector: 'app-upload-resume',
  standalone: true,
  imports: [
    NgIf,
    BasicDetailsComponent,
    EducationComponent,
    WorkedExperienceComponent,
    SkillsComponent,
    JobTypeComponent
  ],
  templateUrl: './upload-resume.component.html',
  styleUrl: './upload-resume.component.scss'
})
export class UploadResumeComponent {
  activeStep = 'basics'; // show first div by default

  showStep(step: string) {
    this.activeStep = step;
  }
}
