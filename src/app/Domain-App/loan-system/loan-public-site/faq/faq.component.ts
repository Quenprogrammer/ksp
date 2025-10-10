import {Component, Pipe, PipeTransform} from '@angular/core';
import {
  NgbAccordionBody,
  NgbAccordionButton, NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem
} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf} from "@angular/common";

interface FAQ{

  question: string;
  answer: string;
}
@Pipe({standalone: true, name: 'replaceLineBreaks'})
class ReplaceLineBreaks implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\n/g, '<br/>');
  }
}
@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionBody,
    ReplaceLineBreaks,
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  qas: FAQ[] = [
    {
      question: 'Our Missions',
      answer: '  Our mission is to provide accessible, transparent, and affordable loan services to individuals, students, farmers, and businesses.,\n' +
        '    We aim to simplify the borrowing process by leveraging technology to reduce paperwork, cut waiting time, and make funds available faster.,\n' +
        '    By ensuring flexible repayment terms and customer-friendly interest rates, we empower people to achieve their personal and professional goals without financial strain.\n'
    },
    {
      question: 'Our Visions',
      answer: 'Our vision is to become the most trusted and innovative loan service provider in Africa, offering financial inclusion to both urban and rural populations.,\n' +
        'We strive to create a future where every eligible individual or business can access quick and reliable credit without unnecessary barriers.,\n' +
        'Through digital transformation, we envision a financial ecosystem that empowers customers to manage loans entirely online with maximum security and convenience.\n' +
        ' '
    },
    {
      question: 'Our Scope',
      answer: 'The scope of our loan system covers a wide range of financial products including personal loans, business loans, education loans, agricultural loans.,\n' +
        'Our services extend beyond simple loan disbursement – we also provide repayment tracking, overdue monitoring, automated reminders, and financial reporting.,\n' +
        'The system is designed for both customers and administrators, ensuring smooth loan applications, approvals, disbursements, and repayments.\n'
    },
    {
      question: 'Targets',
      answer: 'Our primary target audience includes individuals seeking personal or emergency loans for short-term needs.,\n'
        +
        'We also target small and medium enterprises (SMEs) that require funding for growth, expansion, or working capital.,\n'
        +
        'Students and parents are an important demographic, as education financing continues to grow in demand.",\n' +

        'Additionally, farmers and agribusiness owners benefit from tailored agricultural loans that align with seasonal cycles.,\n' +

        'Overall, our goal is to serve anyone who needs transparent, reliable, and affordable credit solutions.\n' +
        ' '
    }

  ];


}
