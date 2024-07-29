import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import {MatInputModule} from '@angular/material/input';

import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MaskedTextBoxModule } from '@progress/kendo-angular-inputs';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';

import { ServicesComponent } from './pages/services/services.component';
import { BloggerComponent } from './pages/blogger/blogger.component';
import { PostBloggerComponent } from './pages/post-blogger/post-blogger.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { ApproveCommentComponent } from './components/approve-comment/approve-comment.component';
import { RejectCommentComponent } from './components/reject-comment/reject-comment.component';

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
    RejectCommentComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    AppRoutingModule,    
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTableModule,
    MaskedTextBoxModule,
    
  ],
  providers: [
    {
      provide: {MAT_DIALOG_DEFAULT_OPTIONS, HTTP_INTERCEPTORS},
      useValue: {hasBackdrop: true},
      // useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
