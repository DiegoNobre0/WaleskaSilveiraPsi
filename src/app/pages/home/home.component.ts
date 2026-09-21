import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BloggerService } from 'src/app/services/blogger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recentPosts: any[] = [];
  loadingPosts: boolean = true;

  testimonials = [
    {
      quote: "Antes da terapia, eu vivia no piloto automático. Nos encontros com a Waleska, fui me escutando e me acolhendo. Hoje faço escolhas com mais consciência, firmeza e amor próprio.",
      author: "Fernanda S.",
      detail: "Paciente de Psicanálise Online"
    },
    {
      quote: "Sempre coloquei as vontades dos outros à frente das minhas. Com a Waleska, compreendi que me respeitar é um ato de amor e aprendi a dizer não sem culpa ou ansiedade.",
      author: "Renata M.",
      detail: "Mentoria Liberta"
    },
    {
      quote: "A abordagem integrada de psicanálise e hipnose me trouxe alívio profundo para crises que me paralisavam há anos. Um espaço de acolhimento seguro, ético e transformador.",
      author: "Juliana R.",
      detail: "Atendimento Presencial no Divã"
    }
  ];

  constructor(
    private router: Router,
    private bloggerService: BloggerService
  ) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    const cached = localStorage.getItem('bloggerPosts');
    if (cached) {
      try {
        const posts = JSON.parse(cached);
        if (Array.isArray(posts) && posts.length > 0) {
          this.recentPosts = posts.slice(0, 3);
          this.loadingPosts = false;
        }
      } catch (e) {
        console.error(e);
      }
    }

    this.bloggerService.getAllPosts().subscribe({
      next: (res: any) => {
        if (res && res.items) {
          localStorage.setItem('bloggerPosts', JSON.stringify(res.items));
          this.recentPosts = res.items.slice(0, 3);
        }
        this.loadingPosts = false;
      },
      error: () => {
        this.loadingPosts = false;
      }
    });
  }

  about(): void {
    this.router.navigate(['/sobre']);
  }

  servicos(): void {
    this.router.navigate(['/servicos']);
  }

  mentoria(): void {
    this.router.navigate(['/mentoria']);
  }

  metodoOrigem(): void {
    this.router.navigate(['/metodo-origem']);
  }

  contato(): void {
    this.router.navigate(['/contato']);
  }

  openPost(id: string): void {
    this.router.navigate(['/post', id]);
  }

  whatsapp(customMsg?: string): void {
    const phoneNumber = '71992117598';
    const message = encodeURIComponent(customMsg || 'Olá Waleska! Vi seu site e gostaria de agendar uma consulta.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }

  extractImageUrl(content: string): string {
    if (!content) return 'assets/logo-nova.svg';
    const match = content.match(/src="([^"]+)"/);
    return match ? match[1] : 'assets/logo-nova.svg';
  }

  extractTitle(title: string): string {
    if (!title) return '';
    const clean = title.replace(/<[^>]+>/g, '').trim();
    return clean.length > 55 ? clean.substring(0, 55) + '...' : clean;
  }

  extractSummary(content: string): string {
    if (!content) return '';
    const clean = content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
    return clean.length > 115 ? clean.substring(0, 115) + '...' : clean;
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}