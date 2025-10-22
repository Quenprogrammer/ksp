import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  @Output() previousStep = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();

  skillsForm: FormGroup;
  selectedSkills: string[] = [];

  // Arrays for dropdown values
  skillsArray1: string[] = [
    'Front-End Developer',
    'Git',
    'Ajax',
    'GitHub'
  ];

  skillsArray2: string[] = [
    'JavaScript',
    'Angular',
    'MySQL',
    'APIs'
  ];

  yearsOfExperienceArray: string[] = [
    'less than 1 year',
    '1 year',
    '2 years',
    '3 years',
    '4 years',
    '5 years',
    '6 years',
    '7 years',
    '8 years',
    '9 years',
    '10+ years'
  ];

  constructor(private fb: FormBuilder) {
    this.skillsForm = this.fb.group({
      newSkill: [''],
      yearsOfExperience: ['less than 1 year', Validators.required]
    });
  }

  ngOnInit(): void {
    // You can initialize with some selected skills if needed
    // this.selectedSkills = ['JavaScript', 'Angular'];
  }

  onSkillChange(event: any, skill: string): void {
    if (event.target.checked) {
      // Add skill if checked
      if (!this.selectedSkills.includes(skill)) {
        this.selectedSkills.push(skill);
      }
    } else {
      // Remove skill if unchecked
      const index = this.selectedSkills.indexOf(skill);
      if (index > -1) {
        this.selectedSkills.splice(index, 1);
      }
    }
  }

  addNewSkill(): void {
    const newSkill = this.skillsForm.get('newSkill')?.value?.trim();
    if (newSkill && !this.selectedSkills.includes(newSkill)) {
      this.selectedSkills.push(newSkill);
      this.skillsForm.get('newSkill')?.setValue('');
    }
  }

  onSubmit(): void {
    if (this.skillsForm.valid) {
      const formData = {
        selectedSkills: this.selectedSkills,
        yearsOfExperience: this.skillsForm.get('yearsOfExperience')?.value,
        newSkill: this.skillsForm.get('newSkill')?.value
      };

      // Submit to console
      console.log('Skills Form Data:', formData);

      // Emit event to go to next step
      this.nextStep.emit();
    } else {
      console.log('Form is invalid');
    }
  }

  goToPreviousStep(): void {
    this.previousStep.emit();
  }
}
