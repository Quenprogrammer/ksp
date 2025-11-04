import { Component, signal, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class Stats {
  totalStudents = signal(0);
  totalLecturers = signal(0);
  totalDepartments = signal(0);
  totalPosts = signal(0);

  studentsStats = signal<Array<{ level: string; students: number; percent: number }>>([]);

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.loadAllCounts();
  }

  async loadAllCounts() {
    // Firestore collections
    const STUDENTS_COLLECTION = 'students';
    const LECTURERS_COLLECTION = 'lecturers';
    const DEPARTMENTS_COLLECTION = 'departments';
    const POSTS_COLLECTION = 'posts';

    // Get counts
    const [studentsSnap, lecturersSnap, departmentsSnap, postsSnap] = await Promise.all([
      getDocs(collection(this.firestore, STUDENTS_COLLECTION)),
      getDocs(collection(this.firestore, LECTURERS_COLLECTION)),
      getDocs(collection(this.firestore, DEPARTMENTS_COLLECTION)),
      getDocs(collection(this.firestore, POSTS_COLLECTION)),
    ]);

    this.totalStudents.set(studentsSnap.size);
    this.totalLecturers.set(lecturersSnap.size);
    this.totalDepartments.set(departmentsSnap.size);
    this.totalPosts.set(postsSnap.size);

    // Example breakdown for ND/HND levels (if levels are fields in student docs)
    // Here we fake counts for demonstration; in real usage, filter based on doc data
    const nd1 = studentsSnap.docs.filter((d) => d.data()['level'] === 'ND1').length;
    const nd2 = studentsSnap.docs.filter((d) => d.data()['level'] === 'ND2').length;
    const hnd1 = studentsSnap.docs.filter((d) => d.data()['level'] === 'HND1').length;
    const hnd2 = studentsSnap.docs.filter((d) => d.data()['level'] === 'HND2').length;


    const total = this.totalStudents();

    this.studentsStats.set([
      { level: 'ND1', students: nd1, percent: total ? (nd1 / total) * 100 : 0 },
      { level: 'ND2', students: nd2, percent: total ? (nd2 / total) * 100 : 0 },
      { level: 'HND1', students: hnd1, percent: total ? (hnd1 / total) * 100 : 0 },
      { level: 'HND2', students: hnd2, percent: total ? (hnd2 / total) * 100 : 0 },
    ]);
  }
}
