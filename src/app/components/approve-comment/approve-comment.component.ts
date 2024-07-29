import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';


@Component({
  selector: 'app-approve-comment',
  templateUrl: './approve-comment.component.html',
  styleUrls: ['./approve-comment.component.scss']
})
export class ApproveCommentComponent  {

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private router: Router
  ) {
    this.approve();
  }

  approve(): void {    
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const token = params['token'];
      if (id && token) {
        this.commentService.approveComment(id, token).subscribe(response => {
          if (response.success) {
            const id_post = response.id_post; // Verifique se a resposta inclui id_post
            this.router.navigate(['/post', id_post]);
          } else {
            alert("Erro ao aprovar o comentário.");
          }
        }, error => {
          alert("Erro ao comunicar com o servidor.");
        });
      } else {
        alert("Parâmetros inválidos.");
      }
    });
  }
}
