import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../../services/comment.service'; 
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reject-comment',
  template: `
    <div style="text-align: center; padding: 50px;">
      <h2>Processando rejeição...</h2>
    </div>
  `
})
export class RejectCommentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const token = params['token'];

      if (id && token) {
        this.commentService.rejectComment(id, token).subscribe({
          next: (response) => {
            this.messageService.add({severity:'info', summary:'Removido', detail:'Comentário rejeitado.'});
            
            // Redireciona para o post para você conferir
            if (response.id_post) {
              this.router.navigate(['/post', response.id_post]);
            } else {
              this.router.navigate(['/']);
            }
          },
          error: () => {
            this.router.navigate(['/']);
          }
        });
      }
    });
  }
}