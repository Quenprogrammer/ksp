import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-complain-statistics',
  standalone: true,
  templateUrl: './complain-statistics.html',
  styleUrls: ['./complain-statistics.css']
})
export class ComplainStatistics implements AfterViewInit {
  @ViewChild('genderPieChart') genderPieChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  studentCount: number = 0;
  lecturerCount: number = 0;

  constructor(private firestore: Firestore) {}

  async ngAfterViewInit(): Promise<void> {
    const studentsRef = collection(this.firestore, 'STUDENTS_COLLECTION');
    const lecturersRef = collection(this.firestore, 'LECTURERS_COLLECTION');

    const students = await firstValueFrom(collectionData(studentsRef));
    const lecturers = await firstValueFrom(collectionData(lecturersRef));

    this.studentCount = students.length;
    this.lecturerCount = lecturers.length;

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: ['Students', 'Lecturers'],
        datasets: [
          {
            data: [this.studentCount, this.lecturerCount],
            backgroundColor: ['#007bff', '#28a745'],
            borderColor: '#fff',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            enabled: true
          }
        }
      }
    };

    this.chart = new Chart(this.genderPieChart.nativeElement, config);
  }
}
