import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';


@Component({
  selector: 'app-reject-comment',
  templateUrl: './reject-comment.component.html',
  styleUrls: ['./reject-comment.component.scss']
})
export class RejectCommentComponent  {
  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private router: Router
  ) {
    this.Reject();
  }

  Reject(): void {   
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const token = params['token'];
      if (id && token) {
        this.commentService.rejectComment(id, token).subscribe(response => {
          // console.log(response)
          if (response.success === true) {
            const id_post = response.id_post; // Verifique se a resposta inclui id_post
            this.router.navigate(['/post', id_post]);
          } else {
            alert("Erro ao rejeitar o comentário.");
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
