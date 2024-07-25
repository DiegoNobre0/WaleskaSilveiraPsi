import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent {
  whatsapp(): void{    
    const phoneNumber = '71992117598';
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre seus serviços.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
}
