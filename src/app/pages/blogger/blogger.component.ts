import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  postsPerPage: number = 4;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Carrega dados iniciais
    this.getPosts();
    this.getPostInstagram();
    this.updatePaginatedPosts();
  }

  ngOnInit() {}

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
      this.bloggerPosts = JSON.parse(dataString);
    }
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
    return img ? img.src : 'assets/logo-wspsi.svg'; // Retorna logo se não tiver imagem
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