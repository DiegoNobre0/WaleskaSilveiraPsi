import { Component } from '@angular/core';

@Component({
  selector: 'app-metodo-origem',
  templateUrl: './metodo-origem.component.html',
  styleUrls: ['./metodo-origem.component.scss']
})
export class MetodoOrigemComponent {

  readonly phoneNumber = '71992117598';

  // 5 Movimentos do Caminho ORIGEM
  movements = [
    {
      step: '01',
      title: 'Consciência',
      subtitle: 'Compreender sua história',
      desc: 'Antes de transformar aquilo que você vive, é preciso olhar para a história que trouxe você até aqui. Reconhecer emoções, crenças e padrões que influenciam a maneira como você se relaciona consigo mesma e com a vida.',
      icon: 'pi pi-eye',
      img: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=700'
    },
    {
      step: '02',
      title: 'Cura',
      subtitle: 'Olhar para as feridas emocionais',
      desc: 'Olhar com acolhimento e verdade para aquilo que ainda dói e influencia silenciosamente suas decisões, relações e sua maneira de viver o presente.',
      icon: 'pi pi-heart',
      img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=700'
    },
    {
      step: '03',
      title: 'Identidade',
      subtitle: 'Reconstruir a percepção sobre si',
      desc: 'Reconstruir a percepção sobre quem você realmente é, fortalecendo a sua autoestima, autoconfiança e a coragem de ser autêntica.',
      icon: 'pi pi-user',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700'
    },
    {
      step: '04',
      title: 'Posicionamento',
      subtitle: 'Fazer escolhas e impor limites',
      desc: 'Aprender a fazer escolhas mais conscientes e alinhadas ao seu bem-estar, estabelecer limites saudáveis sem culpa e ocupar com firmeza o seu lugar.',
      icon: 'pi pi-compass',
      img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=700'
    },
    {
      step: '05',
      title: 'Propósito',
      subtitle: 'Reconectar-se com sua direção',
      desc: 'Reconectar-se com seus desejos mais genuínos, seus valores fundamentais e uma direção clara para construir uma vida com mais sentido e plenitude.',
      icon: 'pi pi-star',
      img: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=700'
    }
  ];

  // 5 Sinais de identificação
  targetAudience = [
    {
      num: '01',
      text: 'Você se acostumou a cuidar de todos, mas deixou de olhar para si.'
    },
    {
      num: '02',
      text: 'Sente que perdeu a conexão com quem você realmente é.'
    },
    {
      num: '03',
      text: 'Tem dificuldade para confiar em si, fazer escolhas e se posicionar.'
    },
    {
      num: '04',
      text: 'Percebe que repete padrões que já não deseja mais viver.'
    },
    {
      num: '05',
      text: 'Sabe que quer mudar, mas ainda não encontrou clareza sobre o caminho.'
    }
  ];

  // Processo de transformação
  processSteps = [
    { title: 'Reconhecer', desc: 'Entender sua história e identificar padrões que ainda influenciam sua vida.' },
    { title: 'Ressignificar', desc: 'Olhar para experiências e emoções com uma nova perspectiva acolhedora.' },
    { title: 'Reconstruir', desc: 'Fortalecer sua identidade, sua autoestima e a sua autoconfiança.' },
    { title: 'Se Posicionar', desc: 'Aprender a fazer escolhas mais conscientes e estabelecer limites saudáveis.' },
    { title: 'Direcionar', desc: 'Reconectar-se com seus desejos, valores essenciais e propósito de vida.' },
    { title: 'Viver', desc: 'Levar essa transformação profunda para suas relações, escolhas e vida cotidiana.' }
  ];

  // O que está incluso
  deliverables = [
    { icon: 'pi pi-lock-open', text: 'Acesso completo ao Método ORIGEM' },
    { icon: 'pi pi-video', text: 'Aulas gravadas e estruturadas em alta definição' },
    { icon: 'pi pi-file-edit', text: 'Materiais e exercícios de aplicação prática' },
    { icon: 'pi pi-users', text: 'Encontros ao vivo com Waleska Silveira' },
    { icon: 'pi pi-heart-fill', text: 'Acompanhamento cuidadoso durante toda a jornada' },
    { icon: 'pi pi-comments', text: 'Acesso à comunidade exclusiva de mulheres' },
    { icon: 'pi pi-sparkles', text: 'Conteúdos e ferramentas complementares' },
    { icon: 'pi pi-calendar', text: '12 meses de acesso irrestrito à plataforma' }
  ];

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  whatsapp(customMessage?: string): void {
    const msg = customMessage || 'Olá Waleska! Gostaria de saber mais sobre o Método ORIGEM e garantir minha vaga.';
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${this.phoneNumber}?text=${encoded}`, '_blank');
  }
}
