import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../../services/comment.service'; 
import { MessageService } from 'primeng/api'; 

@Component({
  selector: 'app-approve-comment',
  template: `
    <div style="text-align: center; padding: 50px;">
      <h2>Processando aprovação...</h2>
      <p>Aguarde um momento.</p>
    </div>
  `
})
export class ApproveCommentComponent implements OnInit {

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
        this.commentService.approveComment(id, token).subscribe({
          next: (response) => {
            this.messageService.add({severity:'success', summary:'Sucesso', detail:'Comentário aprovado!'});
            
            if (response.id_post) {
              this.router.navigate(['/post', response.id_post]); 
            } else {
              this.router.navigate(['/']); 
            }
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao aprovar.'});
            this.router.navigate(['/']); 
          }
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}