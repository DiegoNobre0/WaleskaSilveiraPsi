import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BloggerService } from '../../services/blogger.service';

@Component({
  selector: 'app-post-blogger',
  templateUrl: './post-blogger.component.html',
  styleUrls: ['./post-blogger.component.scss']
})
export class PostBloggerComponent implements OnInit {

  bloggerPost: any;
  postId: any;
  
  // Navegação e Listas
  blogPosts: any[] = [];
  filteredPosts: any[] = [];
  paginatedPosts: any[] = []; // Relacionados
  tags: any[] = [];
  
  // Paginação Relacionados
  currentPage: number = 1;
  postsPerPage: number = 3;

  // Navegação Prev/Next
  titlePrevious: string | null = null;
  titleNext: string | null = null;
  previousId: string | null = null;
  nextId: string | null = null;

  // Comentários
  commentsPost: any[] = [];
  commentsRepostPost: any[] = [];
  contactForm: FormGroup;
  commentForm: FormGroup;
  isComment: boolean = false;
  selectedCommentIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private bloggerService: BloggerService,
  
  ) {
    // Inicializa Forms
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comment: ['', Validators.required],
      id_post: ['']
    });

    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      commentRepost: ['', Validators.required],
      id_comment: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.postId = params['id'];
        this.loadPageData();
    });
  }

  loadPageData() {
    this.contactForm.patchValue({ id_post: this.postId });
    this.getPosts(); // Carrega todos posts (local ou serviço)
    this.getComments(this.postId);
    this.getCommentsRepost();
    
    // Se já temos posts carregados, carrega o post atual
    if (this.blogPosts.length > 0) {
        this.setupCurrentPost();
    }
  }

  getPosts() {
    const dataString = localStorage.getItem('bloggerPosts');
    this.blogPosts = dataString ? JSON.parse(dataString) : [];
    if(this.blogPosts.length > 0) this.setupCurrentPost();
  }

  setupCurrentPost() {
    this.bloggerPost = this.blogPosts.find(p => p.id === this.postId);
    if (this.bloggerPost) {
        this.tags = this.bloggerPost.labels || [];
        this.getPostsNextPrevious(this.postId);
        this.filterPostsByTag();
    }
  }

  getPostsNextPrevious(id: any) {
    const currentIndex = this.blogPosts.findIndex(post => post.id === id);
    if (currentIndex === -1) return;

    const previousIndex = currentIndex > 0 ? currentIndex - 1 : null;
    const nextIndex = currentIndex < this.blogPosts.length - 1 ? currentIndex + 1 : null;

    if (previousIndex !== null) {
        this.previousId = this.blogPosts[previousIndex].id;
        this.titlePrevious = this.blogPosts[previousIndex].title;
    } else {
        this.titlePrevious = null;
    }

    if (nextIndex !== null) {
        this.nextId = this.blogPosts[nextIndex].id;
        this.titleNext = this.blogPosts[nextIndex].title;
    } else {
        this.titleNext = null;
    }
  }

  // --- NAVEGAÇÃO ---
  nextPage() {
    if(this.nextId) this.navigateToPost(this.nextId);
  }

  PreviousPage() {
    if(this.previousId) this.navigateToPost(this.previousId);
  }

  navigateToPost(id: string) {
    this.router.navigate(['/post', id]).then(() => {
        this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  // --- RELACIONADOS & PAGINAÇÃO ---
  filterPostsByTag() {
    if(!this.bloggerPost) return;
    const currentLabels = this.bloggerPost.labels || [];
    
    this.filteredPosts = this.blogPosts.filter(post => 
        post.id !== this.bloggerPost.id && 
        post.labels?.some((l: any) => currentLabels.includes(l))
    );
    this.currentPage = 1;
    this.updatePaginatedPosts();
  }

  updatePaginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    this.paginatedPosts = this.filteredPosts.slice(startIndex, startIndex + this.postsPerPage);
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
  
  getPostBloggerId(id: any) {
      this.navigateToPost(id);
  }

  // --- COMENTÁRIOS ---
  getComments(id: string) {
    this.bloggerService.getCommentsById(id).subscribe((res: any) => this.commentsPost = res);
  }

  getCommentsRepost() {
    this.bloggerService.getCommentsRepost().subscribe((res: any) => this.commentsRepostPost = res);
  }

  getRepliesForComment(commentId: string): any[] {
    return this.commentsRepostPost.filter(reply => reply.id_comment === commentId);
  }

  selectComment(index: number) {
    this.selectedCommentIndex = index;
    this.isComment = true;
  }

  cancelResponse() {
    this.selectedCommentIndex = null;
    this.isComment = false;
  }

  onSubmit() {    
    if (this.contactForm.valid) {
      this.bloggerService.postComment(this.contactForm.value).subscribe(() => {
        this.contactForm.reset();
        this.contactForm.patchValue({ id_post: this.postId });
        this.getComments(this.postId);
        alert('Comentário enviado!');
      });
    }
  }

  onSubmitComment(commentId: string) {
    this.commentForm.patchValue({ id_comment: commentId });
    if (this.commentForm.valid) {
      this.bloggerService.postCommentRepost(this.commentForm.value).subscribe(() => {
        this.commentForm.reset();
        this.cancelResponse();
        this.getCommentsRepost();
        alert('Resposta enviada!');
      });
    }
  }

  // --- HELPERS ---
  extractImageUrl(content: string): string {
    const match = content?.match(/src="([^"]+)"/);
    return match ? match[1] : '';
  }

  extractTitle(content: string): string {
    if(!content) return '';
    let title = content.replace(/<[^>]+>/g, '').trim();
    return title.replace(/&nbsp;/g, '');
  }

  extractSummary(content: string): string {
    if(!content) return '';
    // Remove a primeira imagem para não duplicar com a imagem de destaque
    return content.replace(/<img[^>]*>/i, ''); 
  }

  formatDate(dateString: string): string {
    if(!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  goBack() {
    this.router.navigate(['/blog']);
    // OU se preferir forçar ir para o blog sempre:
    // this.router.navigate(['/blog']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}