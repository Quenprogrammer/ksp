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

  downloadPDF(data$: Observable<any[]>, fields: string[], filename: string) {
    data$.subscribe(data => {
      if (!data || data.length === 0) {
        alert('No data available to download.');
        return;
      }

      const doc = new jsPDF();

      // Add title
      doc.setFontSize(16);
      doc.text('Transaction Report', 14, 15);

      // Prepare table data
      const tableHead = [['SN', ...fields.map(field => field.toUpperCase())]];
      const tableBody = data.map((item, index) =>
        [index + 1, ...fields.map(field => item[field] ?? '')]
      );

      autoTable(doc, {
        startY: 25,
        head: tableHead,
        body: tableBody,
        styles: {fontSize: 10},
        headStyles: {fillColor: [41, 128, 185]}, // Blue header
        margin: {top: 20, left: 10, right: 10},
      });

      doc.save(`${filename}.pdf`);
    });
  }

  downloadJSON(data$: Observable<any[]>, filename: string) {
    data$.subscribe(data => {
      if (!data || data.length === 0) {
        alert('No data available to download.');
        return;
      }

      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], {type: 'application/json'});

      FileSaver.saveAs(blob, `${filename}.json`);
    });
  }

  // ✅ Download as TXT
  downloadTXT(data$: Observable<any[]>, filename: string) {
    data$.subscribe(data => {
      if (!data || data.length === 0) {
        alert('No data available to download.');
        return;
      }

      let textData = '';

      data.forEach((item, index) => {
        textData += `SN: ${index + 1}\n`;
        Object.keys(item).forEach(key => {
          textData += `${key.toUpperCase()}: ${item[key]}\n`;
        });
        textData += `------------------------\n`;
      });

      const blob = new Blob([textData], {type: 'text/plain'});
      FileSaver.saveAs(blob, `${filename}.txt`);
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




  async downloadMarkdown(data$: Observable<any[]>, filename: string) {
    const data = await firstValueFrom(data$);
    if (!data?.length) return alert('No data to export.');

    let md = `# ${filename}\n\n`;

    data.forEach((item, index) => {
      md += `## Item ${index + 1}\n`;
      Object.entries(item).forEach(([key, value]) => {
        md += `- **${key}**: ${value}\n`;
      });
      md += `\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    FileSaver.saveAs(blob, `${filename}.md`);
  }

  async downloadLog(data$: Observable<any[]>, filename: string) {
    const data = await firstValueFrom(data$);
    if (!data?.length) return alert('No data to export.');

    let log = '';
    data.forEach((item, index) => {
      log += `--- Log Entry ${index + 1} ---\n`;
      for (const key in item) {
        log += `${key.toUpperCase()}: ${item[key]}\n`;
      }
      log += '\n';
    });

    const blob = new Blob([log], { type: 'text/plain' });
    FileSaver.saveAs(blob, `${filename}.log`);
  }

  async downloadXML(data$: Observable<any[]>, filename: string) {
    const data = await firstValueFrom(data$);
    if (!data?.length) return alert('No data to export.');

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<items>\n`;
    data.forEach(item => {
      xml += `  <item>\n`;
      for (const key in item) {
        xml += `    <${key}>${item[key]}</${key}>\n`;
      }
      xml += `  </item>\n`;
    });
    xml += `</items>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    FileSaver.saveAs(blob, `${filename}.xml`);
  }

  async downloadHTML(data$: Observable<any[]>, filename: string) {
    const data = await firstValueFrom(data$);
    if (!data?.length) return alert('No data to export.');

    let html = `<html lang=""><head><title>${filename}</title></head><body><table border="1"><thead><tr>`;
    const headers = Object.keys(data[0]);
    html += headers.map(h => `<th>${h}</th>`).join('');
    html += `</tr></thead><tbody>`;
    data.forEach(item => {
      html += `<tr>` + headers.map(h => `<td>${item[h]}</td>`).join('') + `</tr>`;
    });
    html += `</tbody></table></body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    FileSaver.saveAs(blob, `${filename}.html`);
  }


  async downloadTSV(data$: Observable<any[]>, filename: string) {
    const data = await firstValueFrom(data$);
    if (!data?.length) return alert('No data to export.');

    const headers = Object.keys(data[0]);
    let tsv = headers.join('\t') + '\n';
    data.forEach(item => {
      tsv += headers.map(h => item[h]).join('\t') + '\n';
    });

    const blob = new Blob([tsv], { type: 'text/tab-separated-values' });
    FileSaver.saveAs(blob, `${filename}.tsv`);
  }

  async downloadINI(data$: Observable<any[]>, filename: string) {
    const data = await firstValueFrom(data$);
    if (!data?.length) return alert('No data to export.');

    let ini = '';
    data.forEach((item, index) => {
      ini += `[Item${index + 1}]\n`;
      for (const key in item) {
        ini += `${key}=${item[key]}\n`;
      }
      ini += '\n';
    });

    const blob = new Blob([ini], { type: 'text/plain' });
    FileSaver.saveAs(blob, `${filename}.ini`);
  }

  async downloadCFG(data$: Observable<any[]>, filename: string) {
    const data = await firstValueFrom(data$);
    if (!data?.length) return alert('No data to export.');

    let cfg = '';
    data.forEach((item, index) => {
      cfg += `# Config for Item ${index + 1}\n`;
      for (const key in item) {
        cfg += `${key} = ${item[key]}\n`;
      }
      cfg += '\n';
    });

    const blob = new Blob([cfg], { type: 'text/plain' });
    FileSaver.saveAs(blob, `${filename}.cfg`);
  }
}
