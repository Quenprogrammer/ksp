import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterCountService {
  // Method to count characters
  getCharacterCount(text: string): number {
    return text.length;
  }

  // Method to calculate size in KB
  getSizeInKB(text: string): number {
    return new Blob([text]).size / 1024; // Convert bytes to KB
  }
}
