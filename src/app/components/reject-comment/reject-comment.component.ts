import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reject-comment',
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
      <h2><i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i></h2>
      <p>Removendo comentário...</p>
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
          next: (response: any) => {
            this.messageService.add({severity:'info', summary:'Removido', detail:'Comentário rejeitado e excluído.'});
            
            // Redireciona para o post para você conferir que sumiu
            if (response.id_post) {
              this.router.navigate(['/post', response.id_post]);
            } else {
              this.router.navigate(['/']);
            }
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({severity:'error', summary:'Erro', detail:'Falha ao rejeitar.'});
            this.router.navigate(['/']);
          }
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}