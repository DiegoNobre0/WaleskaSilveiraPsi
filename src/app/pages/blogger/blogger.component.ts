import { Component, HostListener, ElementRef, OnInit, OnDestroy, ApplicationRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { bloggerService } from 'src/app/services/blogger.service';
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
    private bloggerService: bloggerService,
    private instagramService: instagramService
  ) {
    this.getPosts();
    this.getPostInstagram();
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

  goToItems() {
   this.router.navigate(['/lista-antibiotico'], { relativeTo: this.route });
  }
 
  postBloger(): void{
    this.router.navigate(['/blogPost'], { relativeTo: this.route });
  
  }

  ngOnInit(){   
    
  }

  openInstagramPost(id: string) {
    window.open(`${id}`, "_blank");
  }

  getPosts() {    
    this.bloggerService.GetAll().subscribe((response: any) => {
      this.bloggerPosts = response.items
      console.log(this.bloggerPosts)
    });
  }  
  getPostBlogger(id:any) {   
    this.router.navigate(['/post', id], { relativeTo: this.route }); 
    // this.bloggerService.Get(id).subscribe((response: any) => {
    //   console.log(response)
    // });
  }  

  getPostInstagram() {
    // debugger
    this.instagramService.GetAll().subscribe((response: any) => {  
      this.instagramPosts= response.data      
    });
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
