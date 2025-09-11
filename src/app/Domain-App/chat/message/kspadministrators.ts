import { Component } from '@angular/core';
import {Message} from './message';

@Component({
  selector: 'app-kspadministrators',
  imports: [
    Message
  ],
  template: `
    <app-message [contacts]="misconductRecievers"  [class]="class"   [description]="description" [header]="name" [body]="body"></app-message>

  `
})
export class KSPAdministrators {

  body='Student Affairs, KSP security, Office of the RECTOR KSP'
  name='Misconduct Report'
  description = `This page allows students and staff to report cases of misconduct within the Polytechnic community. It provides a formal and confidential channel to raise concerns about behaviors that go against the institution’s rules, regulations, and ethical standards.
Through this page, users can:

-Report cases of academic misconduct (e.g., cheating, plagiarism, exam malpractice).

-Lodge complaints about staff or student indiscipline.

-Highlight issues of harassment, bullying, or discrimination.

-Submit concerns about any unethical or unprofessional behavior.

All reports are reviewed carefully and addressed in line with the Polytechnic’s disciplinary policies to promote integrity, respect, and a safe learning environment.
`;
  class='mt-3 lead text-left'

  misconductRecievers=[
    {name:'Student Affairs' , collection:'', icon:'' },
    {name:' KSP security' , collection:'', icon:'' },
    {name:'RECTOR KSP' , collection:'', icon:'' },
  ]
}
