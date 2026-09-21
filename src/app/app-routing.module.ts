import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { BloggerComponent } from './pages/blogger/blogger.component';
import { PostBloggerComponent } from './pages/post-blogger/post-blogger.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { ApproveCommentComponent } from './components/approve-comment/approve-comment.component';
import { RejectCommentComponent } from './components/reject-comment/reject-comment.component';
import { MentoriaLibertaComponent } from './pages/mentoria-liberta/mentoria-liberta.component';
import { MetodoOrigemComponent } from './pages/metodo-origem/metodo-origem.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "sobre", component: AboutComponent },
  { path: "servicos", component: ServicesComponent },
  { path: "blog", component: BloggerComponent },
  { path: 'post/:id', component: PostBloggerComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'approve-comment', component: ApproveCommentComponent },
  { path: 'reject-comment', component: RejectCommentComponent },
  { path: 'mentoria', component: MentoriaLibertaComponent },
  { path: 'metodo-origem', component: MetodoOrigemComponent },
  { path: 'origem', redirectTo: 'metodo-origem', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
