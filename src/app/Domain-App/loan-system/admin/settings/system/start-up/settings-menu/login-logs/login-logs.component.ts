import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {collection, collectionData, deleteDoc, doc, Firestore, getDocs} from '@angular/fire/firestore';
import {AsyncPipe, DatePipe, NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-login-logs',
  imports: [
    NgClass,
    DatePipe,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './login-logs.component.html',
  styleUrl: './login-logs.component.css'
})
export class LoginLogsComponent {
  logs$: Observable<any[]> | undefined;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const logsCol = collection(this.firestore, 'loginsLogs');
    this.logs$ = collectionData(logsCol, { idField: 'id' });
  }

  // 🗑 Delete one log
  async deleteLog(id: string) {
    try {
      await deleteDoc(doc(this.firestore, 'loginsLogs', id));
      console.log(`✅ Log with ID ${id} deleted`);
    } catch (err) {
      console.error('❌ Error deleting log:', err);
    }
  }

  // 🗑 Delete all logs
  async deleteAllLogs() {
    try {
      const logsCol = collection(this.firestore, 'loginsLogs');
      const snapshot = await getDocs(logsCol);
      const batchDeletes: Promise<void>[] = [];

      snapshot.forEach((docSnap:any) => {
        batchDeletes.push(deleteDoc(doc(this.firestore, 'loginsLogs', docSnap.id)));
      });

      await Promise.all(batchDeletes);
      console.log('✅ All logs deleted');
    } catch (err) {
      console.error('❌ Error deleting all logs:', err);
    }
  }
}
