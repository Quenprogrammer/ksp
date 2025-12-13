import {Component, signal, OnInit, HostListener} from '@angular/core';
import {Firestore, doc, getDoc, onSnapshot, setDoc, updateDoc, increment} from '@angular/fire/firestore';
import {RouterLink} from '@angular/router';
import Chart from 'chart.js/auto';
import {StudentContextService} from '../../services/student-context';
import {Comment} from '../../Domain-App/chat/vote/comment/comment';
import {DecimalPipe, NgIf} from '@angular/common';
import {HeaderPoly} from '../../Domain-App/chat/request/header-poly/header-poly';
import {Modal} from '../../shared/modal';

@Component({
  selector: 'app-system-evaluation',
  imports: [
    RouterLink,
    Comment,
    DecimalPipe,
    HeaderPoly,
    Modal,
    NgIf
  ],
  templateUrl: './system-evaluation.html',
  styleUrl: './system-evaluation.css'
})
export class SystemEvaluation {
  isDropdownOpen = false;
  private chartInstance!: Chart;

  // Modal + UI signals
  chartWidth = 350;
  width = '480px';
  height = '400px';
  deviceModal = signal(false);
  backgroundColor = 'white';
  textColor = 'black';
  selectedRating: string | null = null;
  isSaving = signal(false);

  // Chart Data Signals
  satisfactory = signal(0);
  needsImprovement = signal(0);

  // Student + voting state
  student: any;
  hasVoted = signal(false);

  constructor(
    private firestore: Firestore,
    private studentContext: StudentContextService
  ) {}

  ngOnInit(): void {
    this.student = this.studentContext.student;
    this.listenToRatings();
    this.checkIfAlreadyVoted();
  }

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  // 🔹 Dropdown behavior
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent): void {
    const clickedInside = (event.target as HTMLElement).closest('.dropdown');
    if (!clickedInside) this.isDropdownOpen = false;
  }

  // 🔹 Listen to live Firestore rating updates
  listenToRatings() {
    const ratingRef = doc(this.firestore, 'system_rating', 'rating');
    onSnapshot(ratingRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as any;
        this.satisfactory.set(data.satisfactory || 0);
        this.needsImprovement.set(data.needsImprovement || 0);
        this.updateChart();
      } else {
        // Initialize rating document
        setDoc(ratingRef, { satisfactory: 0, needsImprovement: 0 });
      }
    });
  }

  // 🔹 Initialize chart
  initializeChart() {
    const ctx = document.getElementById('doughnutHalfChart') as HTMLCanvasElement;
    if (this.chartInstance) this.chartInstance.destroy();

    this.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Satisfactory', 'Needs Improvement'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ['#28a745', '#dc3545'],
            borderWidth: 4,
            borderColor: '#fff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { display: true, position: 'bottom' },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.formattedValue || '';
                return `${label}: ${value}`;
              },
            },
          },
        },
      },
    });
  }

  updateChart() {
    if (!this.chartInstance) return;
    this.chartInstance.data.datasets[0].data = [
      this.satisfactory(),
      this.needsImprovement(),
    ];
    this.chartInstance.update();
  }

  // 🔹 Check if student already rated
  async checkIfAlreadyVoted() {
    const s = this.student;
    if (!s || !s.registrationNumber) return;

    const voteRef = doc(this.firestore, 'system_rating_votes', s.registrationNumber);
    const snap = await getDoc(voteRef);
    this.hasVoted.set(snap.exists());
  }

  // 🔹 Modal Control
  closeModal() {
    this.deviceModal.set(false);
  }

  setRating(rating: string) {
    this.selectedRating = rating;
    this.submitRating();
  }

  // 🔹 Submit rating (only if user hasn’t rated before)
  async submitRating() {
    if (!this.selectedRating) return;

    const s = this.student;
    if (!s || !s.registrationNumber) {
      alert('No student info found.');
      return;
    }

    if (this.hasVoted()) {
      alert('You have already rated.');
      return;
    }

    this.isSaving.set(true);

    const ratingRef = doc(this.firestore, 'system_rating', 'rating');
    const userVoteRef = doc(this.firestore, 'system_rating_votes', s.registrationNumber);

    try {
      const ratingSnap = await getDoc(ratingRef);

      // ✅ Only increment rating once per student
      if (ratingSnap.exists()) {
        const field =
          this.selectedRating === 'Good' ? 'satisfactory' : 'needsImprovement';
        await updateDoc(ratingRef, { [field]: increment(1) });
      } else {
        await setDoc(ratingRef, {
          satisfactory: this.selectedRating === 'Good' ? 1 : 0,
          needsImprovement: this.selectedRating === 'Bad' ? 1 : 0,
        });
      }

      // ✅ Record this student’s vote
      await setDoc(userVoteRef, {
        studentId: s.registrationNumber,
        rating: this.selectedRating,
        timestamp: new Date().toISOString(),
      });

      this.hasVoted.set(true);
      this.isSaving.set(false);
      this.deviceModal.set(false);
    } catch (err) {
      console.error('Error submitting rating:', err);
      this.isSaving.set(false);
    }
  }

  async openVoteModal() {
    // Wait until student is available
    if (!this.student) {
      alert('Student info not loaded yet.');
      return;
    }

    const s = this.student;
    if (!s.registrationNumber) return;

    try {
      const voteRef = doc(this.firestore, 'system_rating_votes', s.registrationNumber);
      const snap = await getDoc(voteRef);

      if (snap.exists()) {
        this.hasVoted.set(true);
        alert('You have already voted.');
        return;
      }

      // Not voted yet
      this.hasVoted.set(false);
      this.deviceModal.set(true);
    } catch (err) {
      console.error('Error checking vote:', err);
      alert('Failed to check vote status. Please try again.');
    }
  }


}
