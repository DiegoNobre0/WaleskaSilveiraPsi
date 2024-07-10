import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { BloggerComponent } from './pages/blogger/blogger.component';
import { PostBloggerComponent } from './pages/post-blogger/post-blogger.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"sobre", component:AboutComponent},
  {path:"servicos", component:ServicesComponent},
  {path:"blog", component:BloggerComponent},
  {path: 'post/:id', component: PostBloggerComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
