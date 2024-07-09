import { Component, HostListener, ElementRef, OnInit, OnDestroy, ApplicationRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { bloggerService } from 'src/app/services/blogger.service';
import { instagramService } from 'src/app/services/instagram.service';

@Component({
  selector: 'app-blogger',
  templateUrl: './blogger.component.html',
  styleUrls: ['./blogger.component.scss']
})
export class BloggerComponent {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private appRef: ApplicationRef,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private bloggerService: bloggerService,
    private instagramService: instagramService
  ) {
    this.matIconRegistry.addSvgIcon(
      'whatsapp',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/whatsapp.svg')
    );
  }

  atendimento: any;
  imagem: any;
  exibirModal: boolean = false;
  instagramPosts: any[] = [];

  goToItems() {
   this.router.navigate(['/lista-antibiotico'], { relativeTo: this.route });
  }

  ngOnInit(){   
    this.getPosts();
    this.getPostInstagram()
  }

  openInstagramPost(id: string) {
  debugger
    
    
    window.open(`${id}`, "_blank");
  }

  getPosts() {
    // debugger
    this.bloggerService.GetAll().subscribe((response: any) => {
      // console.log(response)
    });
  }

  

  getPostInstagram() {
    // debugger
    this.instagramService.GetAll().subscribe((response: any) => {
      // debugger
      this.instagramPosts= response.data
      console.log(this.instagramPosts)
    });
  }


  
}
