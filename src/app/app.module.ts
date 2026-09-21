import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { AccordionModule } from 'primeng/accordion';
import { ServicesComponent } from './pages/services/services.component';
import { BloggerComponent } from './pages/blogger/blogger.component';
import { PostBloggerComponent } from './pages/post-blogger/post-blogger.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { ApproveCommentComponent } from './components/approve-comment/approve-comment.component';
import { RejectCommentComponent } from './components/reject-comment/reject-comment.component';
import { CarouselModule } from 'primeng/carousel';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputMaskModule } from 'primeng/inputmask';
import { MentoriaLibertaComponent } from './pages/mentoria-liberta/mentoria-liberta.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    ServicesComponent,
    BloggerComponent,
    PostBloggerComponent,
    ContatoComponent,
    WhatsappComponent,
    ApproveCommentComponent,
    RejectCommentComponent,
    MentoriaLibertaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule,
    ButtonModule,
    RippleModule,
    InputMaskModule,
    CdkAccordionModule,
    AccordionModule,
    CarouselModule,
    ToastModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true }
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
