import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadDataService {
  downloadFileWithContent(format: string, content: string) {
    let blob: Blob;
    let fileName: string;

    if (format === 'json') {
      const jsonData = { text: content };
      blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      fileName = 'data.json';
    } else {
      blob = new Blob([content], { type: 'text/plain' });
      fileName = 'data.txt';
    }

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
}
