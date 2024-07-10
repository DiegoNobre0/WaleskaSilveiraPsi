import { ApplicationRef, Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { bloggerService } from 'src/app/services/blogger.service';
import { instagramService } from 'src/app/services/instagram.service';

@Component({
  selector: 'app-post-blogger',
  templateUrl: './post-blogger.component.html',
  styleUrls: ['./post-blogger.component.scss']
})
export class PostBloggerComponent {
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
    this.postId = this.route.snapshot.params['id'];
    this.getPostBlogger(this.postId);
    this.matIconRegistry.addSvgIcon(
      'whatsapp',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/whatsapp.svg')
    );
  }

  atendimento: any;
  imagem: any;
  exibirModal: boolean = false;
  instagramPosts: any[] = [];
  blogPosts: any[] = [];
  bloggerPost: any;
  postId: any;
  formattedText: string = ``;
  currentIndex = 0;
  titlePrevious: any;
  titleNext: any;
  previousId:any;
  nextId:any;  

  ngOnInit() {      
    
    
  }
  
  getPosts() {
    this.bloggerService.GetAll().subscribe((response: any) => {
      this.blogPosts = response.items;
      console.log(this.blogPosts)
    });
  }

  getPostBlogger(id: any) {
    this.bloggerService.Get(id).subscribe((response: any) => {
      this.bloggerPost = response
      this.getPostsNextPrevious(id)
    });
  }

  getPostsNextPrevious(id: any) {
    this.bloggerService.Get(id).subscribe((response: any) => {
      this.bloggerPost = response;

      const currentIndex = this.blogPosts.findIndex(post => post.id === id);

      const previousIndex = currentIndex > 0 ? currentIndex - 1 : null;
      const nextIndex = currentIndex < this.blogPosts.length - 1 ? currentIndex + 1 : null;

      this.previousId = previousIndex !== null ? this.blogPosts[previousIndex].id : null;
      this.nextId = nextIndex !== null ? this.blogPosts[nextIndex].id : null;

      this.titlePrevious = this.previousId !== null ? this.blogPosts.find(post => post.id === this.previousId).title : null;
      this.titleNext = this.nextId !== null ? this.blogPosts.find(post => post.id === this.nextId).title : null;
    });
  }

  nextPage(){
    debugger
    this.getPostBlogger(this.nextId);
    this.router.navigate(['/post',this.nextId], { relativeTo: this.route });
  }

  PreviousPage(){
    this.getPostBlogger(this.previousId);
    this.router.navigate(['/post', this.previousId], { relativeTo: this.route });
  }

  getPostInstagram() {
    // debugger
    this.instagramService.GetAll().subscribe((response: any) => {
      this.instagramPosts = response.data
    });
  }


  extractImageUrl(content: string) {
    // Lógica para extrair o URL da imagem do conteúdo HTML
    const match = content.match(/src="([^"]+)"/);
    return match ? match[1] : '';
  }

  extractTitle(content: string) {
    // Lógica para extrair o título do conteúdo HTML
    let title = content.replace(/<[^>]+>/g, '').trim();
    title = title.replace(/&nbsp;/g, ''); // Remove todos os &nbsp; do texto
    return title.length > 100 ? title.substring(0, 100) + '...' : title; // Limita o tamanho se necessário
  }

  extractSummary(content: string) {
    // Remove espaços em branco e caracteres não visíveis no início do texto
    let summary = content.trim();
    const imgRegex = /<img\b[^>]*?>/gi;

    // Remove a tag <img> e seus atributos da string de conteúdo
    summary = content.replace(imgRegex, '');

    // Se o texto começar com <p>&nbsp;, remover também
    if (summary.startsWith('<p>&nbsp;')) {
      summary = summary.substring('<p>&nbsp;'.length);
    }

    // Se ainda houver caracteres indesejados no início, podemos limpar mais
    summary = summary.trim();

    return summary;
  }

  formatDate(dateString: string): string {
    // Lógica para formatar a data de publicação
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); // Adiciona zero à esquerda se necessário
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adiciona zero à esquerda se necessário
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
