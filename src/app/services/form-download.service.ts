import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDownloadService {

  constructor() {}

  downloadAsTextFile(formData: any, fileName: string = 'form-data.txt') {
    let content = '';

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        content += `${this.capitalize(key)}: ${formData[key]}\n`;
      }
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    window.URL.revokeObjectURL(url);
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
