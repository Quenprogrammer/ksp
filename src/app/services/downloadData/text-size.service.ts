import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextSizeService {
  private encoder = new TextEncoder();

  /**
   * Recursively calculates the total byte size of any value (string, object, etc.)
   */
  private calculateBytes(value: any): number {
    if (value == null) return 0;

    if (typeof value === 'object') {
      return <number>Object.values(value).reduce((sum:any, v) => sum + this.calculateBytes(v), 0);
    }

    const str = value.toString();
    return this.encoder.encode(str).length;
  }

  /**
   * Calculates total size in bytes and kilobytes.
   * Optionally checks if it exceeds a max size.
   *
   * @param input Any object (e.g., form.value)
   * @param maxKB Optional max KB size limit
   */
  getSizeReport(input: any, maxKB?: number): {
    bytes: number;
    kilobytes: string;
    exceedsMax: boolean;
  } {
    const totalBytes = this.calculateBytes(input);
    const kilobytes = (totalBytes / 1024).toFixed(2);
    const exceedsMax = maxKB !== undefined ? totalBytes > maxKB * 1024 : false;

    return { bytes: totalBytes, kilobytes, exceedsMax };
  }
}
