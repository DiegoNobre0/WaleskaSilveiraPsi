import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BloggerService } from 'src/app/services/blogger.service';

@Component({
  selector: 'app-blogger',
  templateUrl: './blogger.component.html',
  styleUrls: ['./blogger.component.scss']
})
export class BloggerComponent implements OnInit {

  instagramPosts: any[] = [];
  bloggerPosts: any[] = [];
  paginatedPost: any[] = [];
  currentPage: number = 1;
  postsPerPage: number = 6;
  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bloggerService: BloggerService
  ) { }

  ngOnInit() {
    this.getPosts();
    this.getPostInstagram();
  }

  // --- NAVEGAÇÃO BLOG ---
  getPostBlogger(id: any) {
    this.router.navigate(['/post', id], { relativeTo: this.route });
  }

  openInstagramPost(url: string) {
    window.open(url, "_blank");
  }

  // --- LÓGICA DE DADOS ---
  getPosts() {
    const dataString = localStorage.getItem('bloggerPosts');
    if (dataString) {
      try {
        this.bloggerPosts = JSON.parse(dataString);
        this.updatePaginatedPosts();
        this.loading = false;
      } catch (e) {
        console.error(e);
      }
    }

    // Sempre faz fallback / refresh para garantir que o usuário veja posts mesmo acessando direto
    this.bloggerService.getAllPosts().subscribe({
      next: (response: any) => {
        if (response && response.items) {
          this.bloggerPosts = response.items;
          localStorage.setItem('bloggerPosts', JSON.stringify(response.items));
          this.updatePaginatedPosts();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar posts:', err);
        this.loading = false;
      }
    });
  }

  getPostInstagram() {
    const dataString = localStorage.getItem('instagramPosts');
    if (dataString) {
      const allPosts = JSON.parse(dataString);
      // Filtra apenas imagens e carrosséis para o grid ficar bonito (opcional, removi o filtro de video para mostrar tudo)
      this.instagramPosts = allPosts.slice(0, 8); // Pega apenas os 8 primeiros para não poluir
    }
  }

  // --- PAGINAÇÃO ---
  nextPageBlog() {
    if ((this.currentPage * this.postsPerPage) < this.bloggerPosts.length) {
      this.currentPage++;
      this.updatePaginatedPosts();
      this.scrollToTop();
    }
  }

  prevPageBlog() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPosts();
      this.scrollToTop();
    }
  }

  updatePaginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    this.paginatedPost = this.bloggerPosts.slice(startIndex, startIndex + this.postsPerPage);
  }

  scrollToTop() {
    const element = document.querySelector('.blog-section');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // --- HELPERS DE TEXTO E DATA ---
  extractImageUrl(content: string): string {
    const div = document.createElement('div');
    div.innerHTML = content;
    const img = div.querySelector('img');
    return img ? img.src : 'assets/logo-nova.svg';
  }

  extractTitle(title: string): string {
    return title.length > 60 ? title.substring(0, 60) + '...' : title;
  }

  extractSummary(content: string): string {
    const div = document.createElement('div');
    div.innerHTML = content;
    const text = div.textContent || div.innerText || '';
    return text.length > 150 ? text.substring(0, 150) + '...' : text;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }
}