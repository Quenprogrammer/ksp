import { Component } from '@angular/core';
import {DownloadService} from './download.service';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-export-data',
  imports: [
    NgForOf
  ],
  templateUrl: './export-data.component.html',
  styleUrl: './export-data.component.css'
})
export class ExportDataComponent {
  collections = ['USERS', 'LOGIN', 'profile']; // ✅ list of collections
  dataMap: { [key: string]: Observable<any[]> } = {};

  constructor(private firestore: Firestore, private download: DownloadService) {
    // map collection → observable
    this.collections.forEach(col => {
      this.dataMap[col] = collectionData(collection(this.firestore, col), { idField: 'id' });
    });
  }

  export(format: string, colName: string) {
    const data$ = this.dataMap[colName];

    switch (format) {
      case 'csv':
        this.download.downloadCSV(data$, ['id'], colName);
        break;
      case 'excel':
        this.download.downloadExcel(data$, colName);
        break;
      case 'pdf':
        this.download.downloadPDF(data$, ['id'], colName);
        break;
      case 'txt':
        this.download.downloadTXT(data$, colName);
        break;
      case 'word':
        this.download.downloadWord(data$, ['id'], colName);
        break;
      case 'json':
        this.download.downloadJSON(data$, colName);
        break;
      case 'xml':
        this.download.downloadXML(data$, colName);
        break;
      case 'html':
        this.download.downloadHTML(data$, colName);
        break;
      case 'tsv':
        this.download.downloadTSV(data$, colName);
        break;
      case 'ini':
        this.download.downloadINI(data$, colName);
        break;
      case 'cfg':
        this.download.downloadCFG(data$, colName);
        break;
      case 'md':
        this.download.downloadMarkdown(data$, colName);
        break;
      case 'log':
        this.download.downloadLog(data$, colName);
        break;
    }
  }
}
