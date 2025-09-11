import {Component} from '@angular/core';
export interface CampusBody {
  fullName: string;
  abbreviation: string;
  logo: string;
  description: string;
}
@Component({
  selector: 'app-others',
  imports: [],
  templateUrl: './others.html',
  styleUrl: './others.scss'
})
export class Others {


  kanoPolyBodies: CampusBody[] = [
  {
    fullName: "Student Union Government",
    abbreviation: "SUG",
    logo: "chatIcons/bodies/sug.jpeg",
    description:
      "The central student representative body responsible for championing student rights, welfare, and organizing social, cultural, and academic activities on campus."
  },
  {
    fullName: "Academic Staff Union of Polytechnics – Kano Chapter",
    abbreviation: "ASUP",
    logo: "chatIcons/bodies/asup.jpeg",
    description:
      "Union of academic staff members at Kano State Polytechnic, advocating for the welfare of lecturers, instructors, and technologists."
  },
  {
    fullName: "Nigeria Association of Computing Students",
    abbreviation: "NACOS",
    logo: "chatIcons/bodies/nacos.png",
    description:
      "A national body with a local chapter at KANOPOLY that represents students in computer science, IT, and related fields, promoting tech development and networking."
  },
  {
    fullName: "Muslim Students’ Society of Nigeria",
    abbreviation: "MSSN",
    logo: "chatIcons/bodies/mssn.png",
    description:
      "An Islamic student organization that fosters moral guidance, religious activities, and community service among Muslim students."
  },


  {
    fullName: "Central Students’ Union Government",
    abbreviation: "CSUG",
    logo: "assets/logos/csug.png",
    description:
      "Also referred to as the central SUG, this is the highest umbrella student government at Kano Polytechnic, coordinating departmental and faculty associations."
  }
];

}
