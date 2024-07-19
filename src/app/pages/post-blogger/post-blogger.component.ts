import { ViewportScroller } from '@angular/common';
import { ApplicationRef, Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BloggerService } from '../../services/blogger.service';

@Component({
  selector: 'app-post-blogger',
  templateUrl: './post-blogger.component.html',
  styleUrls: ['./post-blogger.component.scss']
})
export class PostBloggerComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private viewportScroller: ViewportScroller,
    private bloggerService: BloggerService
  ) {
    this.postId = this.route.snapshot.params['id'];
    this.getPosts();
    this.getPostBlogger(this.postId);
    this.getTags(this.postId);
    this.filterPostsByTag();
    this.matIconRegistry.addSvgIcon(
      'whatsapp',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/whatsapp.svg')
    );
  }

  instagramPosts: any[] = [];
  blogPosts: any[] = [];
  filteredPosts: any[] = [];
  paginatedPost: any[] = [];
  bloggerPost: any;
  postId: any;
  formattedText: string = ``;
  currentIndex = 0;
  titlePrevious: any;
  titleNext: any;
  previousId: any;
  nextId: any;
  pageId: any;
  tags: any[] = []; 
  currentPage: number = 1;
  postsPerPage: number = 3;  
  commentText = '';

  ngOnInit() {

  }

  // submitComment() {
  //   if (this.commentText.trim() === '') {
  //     alert('Por favor, digite um comentário válido.');
  //     return;
  //   }

  //   this.bloggerService.postComment(this.postId, this.commentText).subscribe(
  //     (response) => {
  //       console.log('Comentário postado com sucesso:', response);
  //       alert('Comentário postado com sucesso!');
  //       this.commentText = ''; // Limpar o campo de texto após o envio
  //     },
  //     (error) => {
  //       console.error('Erro ao postar comentário:', error);
  //       alert('Erro ao postar comentário. Por favor, tente novamente mais tarde.');
  //     }
  //   );
  // }

  filterPostsByTag() {
    const currentPostLabels = this.bloggerPost.labels;

    this.filteredPosts = this.blogPosts.filter(blogPost =>
      blogPost !== this.bloggerPost && 
      blogPost.labels.some((label: any) => currentPostLabels.includes(label))
    );

    this.currentPage = 1;
    this.updatePaginatedPosts();
  }

  updatePaginatedPosts() {
    // Lógica para atualizar os posts exibidos na página atual de acordo com a paginação
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    this.paginatedPost = this.filteredPosts.slice(startIndex, startIndex + this.postsPerPage);
  }


  getPosts() {
    const dataString = localStorage.getItem('bloggerPosts');
    this.blogPosts = dataString ? JSON.parse(dataString) : [];
  }

  getPostBlogger(id: any) {
    if (!this.blogPosts || this.blogPosts.length === 0) {
      this.getPosts();
    }
    this.pageId = id;
    this.bloggerPost = this.blogPosts.find(post => post.id === id);

    this.getPostsNextPrevious(id);
  }

  getPostsNextPrevious(id: any) {
    const currentIndex = this.blogPosts.findIndex(post => post.id === id);

    var previousIndex = currentIndex > 0 ? currentIndex - 1 : null;
    var nextIndex = currentIndex < this.blogPosts.length - 1 ? currentIndex + 1 : null;

    this.previousId = previousIndex !== null ? this.blogPosts[previousIndex].id : null;
    this.nextId = nextIndex !== null ? this.blogPosts[nextIndex].id : null;

    this.titlePrevious = this.previousId !== null ? this.blogPosts.find(post => post.id === this.previousId).title : null;
    this.titleNext = this.nextId !== null ? this.blogPosts.find(post => post.id === this.nextId).title : null;
  }


  getPostBloggerId(id:any) {     
    this.getPostBlogger(id);
    this.getTags(id)
    this.filterPostsByTag();
    this.router.navigate(['/post', id], { relativeTo: this.route });    
  }  


  nextPage() {
    this.getPostBlogger(this.nextId);
    this.getTags(this.pageId)
    this.filterPostsByTag();
    this.router.navigate(['/post', this.nextId], { relativeTo: this.route }).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  PreviousPage() {
    this.getPostBlogger(this.previousId);
    this.getTags(this.pageId)
    this.filterPostsByTag();
    this.router.navigate(['/post', this.previousId], { relativeTo: this.route }).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  getTags(id: any) {
    const post = this.blogPosts.find(post => post.id === id);
    this.tags = post ? post.labels : null;
    return this.tags
  }

  get paginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    return this.filteredPosts.slice(startIndex, endIndex);
  }

  nextPageBlog() {
    if ((this.currentPage * this.postsPerPage) < this.filteredPosts.length) {
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

  extractImageUrl(content: string) {
    const match = content.match(/src="([^"]+)"/);
    return match ? match[1] : '';
  }

  extractTitle(content: string) {
    let title = content.replace(/<[^>]+>/g, '').trim();
    title = title.replace(/&nbsp;/g, '');
    return title.length > 100 ? title.substring(0, 100) + '...' : title;
  }

  extractSummary(content: string) {
    let summary = content.trim();
    const imgRegex = /<img\b[^>]*?>/gi;

    summary = content.replace(imgRegex, '');

    if (summary.startsWith('<p>&nbsp;')) {
      summary = summary.substring('<p>&nbsp;'.length);
    }

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
