import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { MessageService } from 'primeng/api'; // Se estiver usando PrimeNG

@Component({
  selector: 'app-approve-comment',
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
      <h2><i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i></h2>
      <p>Processando aprovação do comentário...</p>
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
    // 1. Pega os parâmetros da URL
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const token = params['token'];

      if (id && token) {
        // 2. Chama o Backend
        this.commentService.approveComment(id, token).subscribe({
          next: (response: any) => {
            // Sucesso!
            this.messageService.add({severity:'success', summary:'Sucesso', detail:'Comentário aprovado!'});
            
            // 3. Redireciona para o post (o backend devolveu o id_post)
            if (response.id_post) {
              this.router.navigate(['/post', response.id_post]);
            } else {
              this.router.navigate(['/']);
            }
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({severity:'error', summary:'Erro', detail:'Falha ao aprovar. Token inválido ou expirado.'});
            this.router.navigate(['/']);
          }
        });
      } else {
        this.router.navigate(['/']); // Link inválido
      }
    });
  }
}