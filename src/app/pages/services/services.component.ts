import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  whatsapp(customMessage?: string): void {    
    const phoneNumber = '71992117598';
    const text = customMessage || 'Olá! Gostaria de mais informações sobre os atendimentos.';
    const message = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
}