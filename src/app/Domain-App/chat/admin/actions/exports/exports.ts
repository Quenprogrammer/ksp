import { Component } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-exports',
  templateUrl: './exports.html',
  styleUrls: ['../actions.css']
})
export class Exports {

  constructor(private firestore: Firestore) {}

  // -------------------------
  // MENU BUTTONS
  // -------------------------
  exportData = [
    { name: 'Students', icon: 'chatIcons/adminIcon/data-center-data-warehouse-svgrepo-com.svg', function: () => this.exportCollectionToExcel('students') },
    { name: 'Lecturers', icon: 'chatIcons/adminIcon/data-cluster-outline-badged-svgrepo-com.svg', function: () => this.exportCollectionToExcel('lecturers') },
    { name: 'Departments', icon: 'chatIcons/adminIcon/data-database-eternet-server-storage-svgrepo-com.svg', function: () => this.exportCollectionToExcel('departments') },
    { name: 'Messages', icon: 'chatIcons/adminIcon/data-definition-details-svgrepo-com.svg', function: () => this.exportCollectionToExcel('messages') },
    { name: 'Logs', icon: 'chatIcons/adminIcon/data-drive-flash-plug-usb-svgrepo-com.svg', function: () => this.exportCollectionToExcel('logs') },
  ];

  // -------------------------
  // EXPORT SINGLE COLLECTION
  // -------------------------
  async exportCollectionToExcel(collectionName: string) {
    console.log(`Exporting collection: ${collectionName}`);

    const collRef = collection(this.firestore, collectionName);
    const snapshot = await getDocs(collRef);

    const data: any[] = [];
    snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, collectionName.substring(0, 31));
    XLSX.writeFile(workbook, `${collectionName}.xlsx`);

    console.log(`${collectionName}.xlsx saved.`);
  }

  // -------------------------
  // EXPORT ALL COLLECTIONS
  // -------------------------
  async exportAllToExcel() {
    const collectionNames = [
      'STUDENTS_COLLECTION',
      'LECTURERS_COLLECTION',
      'departments',
      'messages',
      'logs'
    ];

    const workbook = XLSX.utils.book_new();

    for (const name of collectionNames) {
      const collRef = collection(this.firestore, name);
      const snapshot = await getDocs(collRef);

      const data: any[] = [];
      snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, name.substring(0, 31));
    }

    XLSX.writeFile(workbook, 'All_Collections.xlsx');
    console.log('All_Collections.xlsx saved.');
  }
}
