import { Component } from '@angular/core';

@Component({
  selector: 'app-mentoria-liberta',
  templateUrl: './mentoria-liberta.component.html',
  styleUrls: ['./mentoria-liberta.component.scss']
})
export class MentoriaLibertaComponent {

  testimonials = [
    {
      name: 'Fernanda S.',
      age: '35 anos',
      text: 'Antes da terapia, eu vivia no piloto automático. Através dos encontros com a Waleska, fui me escutando e me olhando com mais carinho. Hoje faço escolhas com mais consciência e amor.'
    },
    {
      name: 'Renata M.',
      age: '38 anos',
      text: 'Sempre coloquei as necessidades dos outros acima das minhas. Quando Waleska entrou na minha vida, entendi que me respeitar também é um ato de amor. Aprendi a dizer não sem culpa.'
    },
    {
      name: 'Juliana R.',
      age: '42 anos',
      text: 'As sessões de terapia com Waleska me ensinaram a olhar minha história com mais compaixão. Não preciso mais carregar esse peso sozinha. Hoje me perdoo com mais leveza.'
    }
  ];

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  whatsapp(): void {
    const phoneNumber = '71992117598'; // Seu número
    const message = encodeURIComponent('Olá! Vi a página da Mentoria Liberta e gostaria de saber mais sobre o plano Anual.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}