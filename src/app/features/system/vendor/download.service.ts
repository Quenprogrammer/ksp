import { Injectable } from '@angular/core';
import {firstValueFrom, Observable} from 'rxjs';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType
} from 'docx';
@Injectable({
  providedIn: 'root'
})
export class   DownloadService {

  constructor() {
  }

  // ✅ Download as CSV
  downloadCSV(data$: Observable<any[]>, fields: string[], filename: string) {
    data$.subscribe(data => {
      if (!data || data.length === 0) {
        alert('No data available to download.');
        return;
      }

      let csvData = fields.join(',') + '\n'; // CSV Header

      data.forEach((item, index) => {
        let row = fields.map(field => item[field] ?? '').join(',');
        csvData += `${index + 1},${row}\n`; // Add data row
      });

      const blob = new Blob([csvData], {type: 'text/csv'});
      FileSaver.saveAs(blob, `${filename}.csv`);
    });
  }

  // ✅ Download as Excel
  downloadExcel(data$: Observable<any[]>, filename: string) {
    data$.subscribe(data => {
      if (!data || data.length === 0) {
        alert('No data available to download.');
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

      const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
      const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});

      FileSaver.saveAs(blob, `${filename}.xlsx`);
    });
  }


  downloadWord(data$: Observable<any[]>, fields: string[], filename: string) {
    data$.subscribe(data => {
      if (!data || data.length === 0) {
        alert('No data available to download.');
        return;
      }

      // ✅ Create header row with bold TextRun
      const headerRow = new TableRow({
        children: fields.map(field =>
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({text: field.toUpperCase(), bold: true})]
              })
            ],
            width: {size: 25, type: WidthType.PERCENTAGE}
          })
        )
      });

      // ✅ Create data rows
      const dataRows = data.map(item =>
        new TableRow({
          children: fields.map(field =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({text: String(item[field] ?? '')})]
                })
              ],
              width: {size: 25, type: WidthType.PERCENTAGE}
            })
          )
        })
      );

      // ✅ Construct the document
      const table = new Table({
        rows: [headerRow, ...dataRows]
      });

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [new TextRun({text: 'Transaction Report', bold: true, size: 28})],
                spacing: {after: 200}
              }),
              table
            ]
          }
        ]
      });

      // ✅ Generate and download the Word document
      Packer.toBlob(doc).then(blob => {
        FileSaver.saveAs(blob, `${filename}.docx`);
      }).catch(err => {
        console.error('Failed to generate Word file:', err);
        alert('Error generating Word document.');
      });
    });
  }





  }
