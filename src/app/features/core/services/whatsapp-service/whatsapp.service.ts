import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  phoneNumber: string = "+905428729869";
  defaultMessage:string ="Hello, I would like to make enquiries. I came from our Tibetrealtyco website"
  constructor() {
  }

  openWhatsApp(phoneNumber: string, message: string): void {
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  openWhatsAppGlobal(message: string): void {
    const url = `https://api.whatsapp.com/send?phone=${this.phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  sendDefaultMessage(): void {
    const url = `https://api.whatsapp.com/send?phone=${this.phoneNumber}&text=${encodeURIComponent(this.defaultMessage)}`;
    window.open(url, '_blank');
  }
}
