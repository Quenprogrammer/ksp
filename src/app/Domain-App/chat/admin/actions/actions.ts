/*
import { Component } from '@angular/core';
import { Firestore, collection, getDocs, deleteDoc, doc, setDoc, getDoc } from '@angular/fire/firestore';
import * as XLSX from 'xlsx';
import {NgIf} from '@angular/common';
import {Modal} from '../../../../shared/modal';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-actions',
  imports: [
    NgIf,
    Modal,
    FormsModule
  ],
  templateUrl: './actions.html',
  styleUrl: './actions.css'
})
export class Actions {
  message = '';
  enteredPassword = '';
  passwordModalVisible = false;
  currentAction = '';
  currentActionLabel = '';
  collections = ['students', 'lecturers', 'departments', 'courses'];
  private adminPassword = '27227850'; // 🔐 Master password

  constructor(private firestore: Firestore) {}

  // 🧩 Open password modal for a specific action
  openPasswordModal(action: string) {
    this.currentAction = action;
    this.enteredPassword = '';
    this.currentActionLabel = this.getActionLabel(action);
    this.passwordModalVisible = true;
  }

  // 🧩 Close password modal
  closePasswordModal() {
    this.passwordModalVisible = false;
    this.enteredPassword = '';
  }

  // 🔖 Label for each action
  private getActionLabel(action: string): string {
    switch (action) {
      case 'deleteAll': return 'Delete All Collections';
      case 'saveAllToExcel': return 'Save All to Excel';
      case 'deleteSingleCollection': return 'Delete Single Collection';
      case 'lockSite': return 'Lock Site';
      case 'unlockSite': return 'Unlock Site';
      default: return 'Perform Action';
    }
  }

  // 🧩 Validate password and perform action
  async confirmAction() {
    if (this.enteredPassword !== this.adminPassword) {
      alert('❌ Incorrect password. Operation cancelled.');
      this.closePasswordModal();
      return;
    }

    switch (this.currentAction) {
      case 'deleteAll': await this.deleteAll(); break;
      case 'saveAllToExcel': await this.saveAllToExcel(); break;
      case 'deleteSingleCollection': await this.deleteSingleCollection(); break;
      case 'lockSite': await this.lockSite(); break;
      case 'unlockSite': await this.unlockSite(); break;
    }

    this.closePasswordModal();
  }

  // 🔥 Delete all documents from multiple collections
  async deleteAll() {
    try {
      for (const col of this.collections) {
        const snapshot = await getDocs(collection(this.firestore, col));
        for (const d of snapshot.docs) await deleteDoc(doc(this.firestore, col, d.id));
      }
      this.message = '✅ All documents deleted from all collections!';
    } catch (error) {
      console.error(error);
      this.message = '❌ Error deleting data!';
    }
  }

  // 🔥 Delete all docs from a single collection
  async deleteSingleCollection() {
    const colName = prompt('Enter collection name to delete:');
    if (!colName) return;
    try {
      const snapshot = await getDocs(collection(this.firestore, colName));
      for (const d of snapshot.docs) await deleteDoc(doc(this.firestore, colName, d.id));
      this.message = `✅ All documents deleted from ${colName}`;
    } catch (error) {
      console.error(error);
      this.message = '❌ Error deleting collection!';
    }
  }

  // 📁 Save all collection data to Excel
  async saveAllToExcel() {
    try {
      const allData: any = {};
      for (const col of this.collections) {
        const snapshot = await getDocs(collection(this.firestore, col));
        allData[col] = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      }

      const workbook = XLSX.utils.book_new();
      for (const col in allData) {
        const ws = XLSX.utils.json_to_sheet(allData[col]);
        XLSX.utils.book_append_sheet(workbook, ws, col);
      }

      XLSX.writeFile(workbook, 'AllCollectionsBackup.xlsx');
      this.message = '✅ Data exported to Excel successfully!';
    } catch (error) {
      console.error(error);
      this.message = '❌ Error exporting data!';
    }
  }

  // 🔒 Lock site (set access=false)
  async lockSite() {
    try {
      const authDoc = doc(this.firestore, 'authorization', 'siteControl');
      const snapshot = await getDoc(authDoc);
      if (!snapshot.exists()) await setDoc(authDoc, { access: false });
      else await setDoc(authDoc, { access: false }, { merge: true });
      this.message = '🔒 Site locked successfully.';
    } catch (error) {
      console.error(error);
      this.message = '❌ Error locking site!';
    }
  }

  // 🔓 Unlock site (set access=true)
  async unlockSite() {
    try {
      const authDoc = doc(this.firestore, 'authorization', 'siteControl');
      const snapshot = await getDoc(authDoc);
      if (!snapshot.exists()) await setDoc(authDoc, { access: true });
      else await setDoc(authDoc, { access: true }, { merge: true });
      this.message = '🔓 Site unlocked successfully.';
    } catch (error) {
      console.error(error);
      this.message = '❌ Error unlocking site!';
    }
  }

  exportData = [
    { name: 'Student', icon: 'chatIcons/adminIcon/data-center-data-warehouse-svgrepo-com.svg', function: '' },
    { name: 'Lecturers', icon: 'chatIcons/adminIcon/data-cluster-outline-badged-svgrepo-com.svg', function: '' },
    { name: 'Departments', icon: 'chatIcons/adminIcon/data-database-eternet-server-storage-svgrepo-com.svg', function: '' },
    { name: 'Messages', icon: 'chatIcons/adminIcon/data-definition-details-svgrepo-com.svg', function: '' },
    { name: 'Logs', icon: 'chatIcons/adminIcon/data-drive-flash-plug-usb-svgrepo-com.svg', function: '' },

  ]
   dataIcons = [
    { name: 'Download DB', icon: 'chatIcons/adminIcon/data-bank-1-svgrepo-com.svg', function: '' },
    { name: 'Lock Admin Site', icon: 'chatIcons/adminIcon/data-breach-svgrepo-com.svg', function: '' },
     { name: 'Lock Student Portal', icon: 'chatIcons/adminIcon/data-storage-lock-solid-svgrepo-com.svg', function: '' },

     { name: 'Delete messages', icon: 'chatIcons/adminIcon/data-exchange-interface-symbol-svgrepo-com.svg', function: '' },
    { name: 'Data stats', icon: 'chatIcons/adminIcon/data-in-a-folder-interface-symbol-svgrepo-com.svg', function: '' },
    { name: 'Data Management', icon: 'chatIcons/adminIcon/data-management-svgrepo-com.svg', function: '' },
     { name: 'Delete DB', icon: 'chatIcons/adminIcon/data-storage-network-solid-svgrepo-com.svg', function: '' },
      { name: 'Delete Logs', icon: 'chatIcons/adminIcon/real-time-data-display-svgrepo-com.svg', function: '' },
    { name: 'Sensor Data', icon: 'chatIcons/adminIcon/sensor-svgrepo-com.svg', function: '' },
  ];

}
*/
import { Component } from '@angular/core';
import { Firestore, collection, getDocs, deleteDoc, doc, setDoc, getDoc } from '@angular/fire/firestore';
import * as XLSX from 'xlsx';
import { NgIf } from '@angular/common';
import { Modal } from '../../../../shared/modal';
import { FormsModule } from '@angular/forms';
import {Exports} from './exports/exports';

@Component({
  selector: 'app-actions',
  imports: [NgIf, Modal, FormsModule, Exports],
  templateUrl: './actions.html',
  styleUrl: './actions.css'
})
export class Actions {
  message = '';
  enteredPassword = '';
  passwordModalVisible = false;
  currentAction = '';
  currentActionLabel = '';
  collections = ['students', 'lecturers', 'departments', 'courses'];
  private adminPassword = '27227850'; // 🔐 Master password

  constructor(private firestore: Firestore) {}

  // 🧩 Open password modal for a specific action
  openPasswordModal(action: string) {
    this.currentAction = action;
    this.enteredPassword = '';
    this.currentActionLabel = this.getActionLabel(action);
    this.passwordModalVisible = true;
  }

  // 🧩 Close password modal
  closePasswordModal() {
    this.passwordModalVisible = false;
    this.enteredPassword = '';
  }

  // 🔖 Label for each action
  private getActionLabel(action: string): string {
    switch (action) {
      case 'deleteAll': return 'Delete All Collections';
      case 'saveAllToExcel': return 'Save All to Excel';
      case 'deleteSingleCollection': return 'Delete Single Collection';
      case 'lockSite': return 'Lock Site';
      case 'unlockSite': return 'Unlock Site';
      case 'deleteMessages': return 'Delete Messages Collection';
      case 'deleteLogs': return 'Delete Logs Collection';
      default: return 'Perform Action';
    }
  }

  // 🧩 Validate password and perform action
  async confirmAction() {
    if (this.enteredPassword !== this.adminPassword) {
      alert('❌ Incorrect password. Operation cancelled.');
      this.closePasswordModal();
      return;
    }

    switch (this.currentAction) {
      case 'deleteAll': await this.deleteAll(); break;
      case 'saveAllToExcel': await this.saveAllToExcel(); break;
      case 'deleteSingleCollection': await this.deleteSingleCollection(); break;
      case 'lockSite': await this.lockSite(); break;
      case 'unlockSite': await this.unlockSite(); break;
      case 'deleteMessages': await this.deleteCollection('Messages'); break;
      case 'deleteLogs': await this.deleteCollection('Logs'); break;
    }

    this.closePasswordModal();
  }

  // 🔥 Delete all documents from multiple collections
  async deleteAll() {
    try {
      for (const col of this.collections) {
        const snapshot = await getDocs(collection(this.firestore, col));
        for (const d of snapshot.docs) await deleteDoc(doc(this.firestore, col, d.id));
      }
      this.message = '✅ All documents deleted from all collections!';
    } catch (error) {
      console.error(error);
      this.message = '❌ Error deleting data!';
    }
  }

  // 🔥 Delete all docs from a single collection
  async deleteSingleCollection() {
    const colName = prompt('Enter collection name to delete:');
    if (!colName) return;
    await this.deleteCollection(colName);
  }

  // 🔥 Generic delete function
  async deleteCollection(colName: string) {
    try {
      const snapshot = await getDocs(collection(this.firestore, colName));
      for (const d of snapshot.docs) await deleteDoc(doc(this.firestore, colName, d.id));
      alert(`✅ All documents deleted from ${colName}`);
    } catch (error) {
      console.error(error);
      alert(`❌ Error deleting ${colName}!`);
    }
  }

  // 📁 Save all collection data to Excel
  async saveAllToExcel() {
    try {
      const allData: any = {};
      for (const col of this.collections) {
        const snapshot = await getDocs(collection(this.firestore, col));
        allData[col] = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      }

      const workbook = XLSX.utils.book_new();
      for (const col in allData) {
        const ws = XLSX.utils.json_to_sheet(allData[col]);
        XLSX.utils.book_append_sheet(workbook, ws, col);
      }

      XLSX.writeFile(workbook, 'AllCollectionsBackup.xlsx');
      this.message = '✅ Data exported to Excel successfully!';
    } catch (error) {
      console.error(error);
      this.message = '❌ Error exporting data!';
    }
  }

  // 🔒 Lock site (set access=false)
  async lockSite() {
    try {
      const authDoc = doc(this.firestore, 'authorization', 'siteControl');
      const snapshot = await getDoc(authDoc);
      if (!snapshot.exists()) await setDoc(authDoc, { access: false });
      else await setDoc(authDoc, { access: false }, { merge: true });
      this.message = '🔒 Site locked successfully.';
    } catch (error) {
      console.error(error);
      this.message = '❌ Error locking site!';
    }
  }

  // 🔓 Unlock site (set access=true)
  async unlockSite() {
    try {
      const authDoc = doc(this.firestore, 'authorization', 'siteControl');
      const snapshot = await getDoc(authDoc);
      if (!snapshot.exists()) await setDoc(authDoc, { access: true });
      else await setDoc(authDoc, { access: true }, { merge: true });
      this.message = '🔓 Site unlocked successfully.';
    } catch (error) {
      console.error(error);
      this.message = '❌ Error unlocking site!';
    }
  }

  // 🧩 Export options


  dataIcons = [
    { name: 'Download DB', icon: 'chatIcons/adminIcon/data-bank-1-svgrepo-com.svg', function: () => this.openPasswordModal('saveAllToExcel') },
    { name: 'Lock Admin Site', icon: 'chatIcons/adminIcon/data-breach-svgrepo-com.svg', function: () => this.openPasswordModal('lockSite') },
    { name: 'Unlock Site', icon: 'chatIcons/adminIcon/data-storage-lock-solid-svgrepo-com.svg', function: () => this.openPasswordModal('unlockSite') },
    { name: 'Delete Messages', icon: 'chatIcons/adminIcon/data-exchange-interface-symbol-svgrepo-com.svg', function: () => this.openPasswordModal('deleteMessages') },
    { name: 'Delete Logs', icon: 'chatIcons/adminIcon/real-time-data-display-svgrepo-com.svg', function: () => this.openPasswordModal('deleteLogs') },
    { name: 'Delete All', icon: 'chatIcons/adminIcon/data-storage-network-solid-svgrepo-com.svg', function: () => this.openPasswordModal('deleteAll') },
  ];
}
