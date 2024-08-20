import { ViewportScroller } from '@angular/common';
import { ApplicationRef, Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BloggerService } from '../../services/blogger.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-blogger',
  templateUrl: './post-blogger.component.html',
  styleUrls: ['./post-blogger.component.scss']
})
export class PostBloggerComponent {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private viewportScroller: ViewportScroller,
    private bloggerService: BloggerService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],      
      comment: ['', Validators.required],
      id_post:['']
    });
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],      
      commentRepost: ['', Validators.required],
      id_comment:['']
    });
    this.postId = this.route.snapshot.params['id'];
    this.getPosts();
    this.getCommentsRepost();
    this.getPostBlogger(this.postId);
    this.getTags(this.postId);
    this.filterPostsByTag();
    this.matIconRegistry.addSvgIcon(
      'whatsapp',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/whatsapp.svg')
    );
    this.contactForm.patchValue({
      id_post: this.postId
    });
  }

  instagramPosts: any[] = [];
  blogPosts: any[] = [];
  filteredPosts: any[] = [];
  paginatedPost: any[] = [];
  commentsPost: any[] = [];
  commentsRepostPost: any[] = [];
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
  contactForm: FormGroup;
  commentForm: FormGroup;
  isComment: boolean = false; 
  nameComment:any = ''
  selectedCommentIndex: number | null = null;
  id_comment: any;

  ngOnInit() {
    this.getComments(this.postId)
  }

  selectComment(index: number): void {    
    this.selectedCommentIndex = index;
    this.isComment = true;
  }
  
  cancelResponse(): void {
    this.selectedCommentIndex = null;
    this.isComment = false;
  }

  onSubmitComment(idComment:any): void {  
    this.id_comment = idComment;
    this.commentForm.patchValue({
      id_comment: idComment
    });

    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
     
    } else {
      this.selectedCommentIndex = null; 
      this.isComment = false;     
     
      this.bloggerService.postCommentRepost(this.commentForm.value).subscribe(
        (response) => {                
          this.commentForm.reset(); 
          this.getComments(this.postId);
          this.getCommentsRepost()
        },
        (error) => {
          console.error('Erro ao postar comentário:', error);
          alert('Erro ao postar comentário. Por favor, tente novamente mais tarde.');
        }
      );
    }
  }

  getRepliesForComment(commentId: string): any[] {
    return this.commentsRepostPost.filter(reply => reply.id_comment === commentId);
  }


  replaceComment(){    
    this.isComment = true;   
  }

  onSubmit() {
    debugger
    if (this.contactForm.valid) {
      // console.log(this.contactForm.value);
    this.bloggerService.postComment(this.contactForm.value).subscribe(
      (response) => {
        this.contactForm.reset(); 
        this.getComments(this.postId)
      },
      (error) => {
        console.error('Erro ao postar comentário:', error);
        alert('Erro ao postar comentário. Por favor, tente novamente mais tarde.');
      }
    );
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  getComments(id:string){    
    this.bloggerService.getCommentsById(id).subscribe((response: any) => {
     this.commentsPost = response;
    //  console.log(this.commentsPost)
    });
  }

  getCommentsRepost(){    
    this.bloggerService.getCommentsRepost().subscribe((response: any) => {
     this.commentsRepostPost = response;
    //  console.log(this.commentsRepostPost)
    });
  }

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
    this.getComments(id)
    this.getCommentsRepost()
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
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); 
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
