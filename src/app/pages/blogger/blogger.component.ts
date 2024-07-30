import { Component, HostListener, ElementRef, OnInit, OnDestroy, ApplicationRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { instagramService } from 'src/app/services/instagram.service';

@Component({
  selector: 'app-blogger',
  templateUrl: './blogger.component.html',
  styleUrls: ['./blogger.component.scss']
})
export class BloggerComponent {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private appRef: ApplicationRef,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,    
    private instagramService: instagramService
  ) {
    this.getPosts();
    this.getPostInstagram();
    this.updatePaginatedPosts();
    this.matIconRegistry.addSvgIcon(
      'whatsapp',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/whatsapp.svg')
    );
  }

  atendimento: any;
  imagem: any;
  exibirModal: boolean = false;
  instagramPosts: any[] = [];
  bloggerPosts: any[] = [];
  paginatedPost: any[] = [];
  currentPage: number = 1;
  postsPerPage: number = 4;
 
 
  postBloger(): void{
    this.router.navigate(['/blogPost'], { relativeTo: this.route });  
  }

  ngOnInit(){   
    
  }

  
  nextPageBlog() {
    if ((this.currentPage * this.postsPerPage) < this.bloggerPosts.length) {
      this.currentPage++;
      this.updatePaginatedPosts();
    }
  }
  
  prevPageBlog() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPosts();
    }
  }
  
  updatePaginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    this.paginatedPost = this.bloggerPosts.slice(startIndex, startIndex + this.postsPerPage);
  }

  openInstagramPost(id: string) {
    window.open(`${id}`, "_blank");
  }

  getPosts() {    
    const dataString = localStorage.getItem('bloggerPosts');
    this.bloggerPosts = dataString ? JSON.parse(dataString) : null;       
  }  
  getPostBlogger(id:any) {   
    this.router.navigate(['/post', id], { relativeTo: this.route });    
  }  

  getPostInstagram() {
    const dataString = localStorage.getItem('instagramPosts');
    if (dataString) {
      const instagramPosts = JSON.parse(dataString);
      this.instagramPosts = instagramPosts.filter((post: any) => post.media_type !== "VIDEO");
    } else {
      this.instagramPosts = [];
    }
  }


  extractImageUrl(content: string): string {
    // Lógica para extrair o URL da imagem do conteúdo HTML
    let match = content.match(/src="([^"]+)"/);
    return match ? match[1] : '';
}

extractTitle(content: string): string {
    // Lógica para extrair o título do conteúdo HTML
    let title = content.replace(/<[^>]+>/g, '').trim();
    title = title.replace(/&nbsp;/g, ''); // Remove todos os &nbsp; do texto
    return title.length > 100 ? title.substring(0, 100) + '...' : title; // Limita o tamanho se necessário
}

extractSummary(content: string): string {
  // Remover tags HTML e caracteres não visíveis do início
  let plainText = content.replace(/<[^>]+>/g, '').replace(/^&nbsp;/, '').trim();

  // Limitar o texto extraído a 200 caracteres
  let summary = plainText.substring(0, 195);

  // Retornar o resumo com reticências no final, se necessário
  return summary.length < plainText.length ? summary + '...' : summary;
}

formatDate(dateString: string): string {
    // Lógica para formatar a data de publicação
    let date = new Date(dateString);
    let day = ('0' + date.getDate()).slice(-2); // Adiciona zero à esquerda se necessário
    let month = ('0' + (date.getMonth() + 1)).slice(-2); // Adiciona zero à esquerda se necessário
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

  
}
