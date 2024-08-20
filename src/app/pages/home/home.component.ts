import { Component, HostListener, ElementRef, OnInit, OnDestroy, ApplicationRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BloggerService } from 'src/app/services/blogger.service';
import { instagramService } from 'src/app/services/instagram.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private appRef: ApplicationRef,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private bloggerService: BloggerService,
    private instagramService: instagramService
  ) {
    this.matIconRegistry.addSvgIcon(
      'whatsapp',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/whatsapp.svg')
    );
  }


  instagramPosts: any[] = [];
  bloggerPosts: any[] = [];

 

  ngOnInit(){   
    this.getPosts()
    this.getPostInstagram()
  }

  getPosts() {    
    this.bloggerService.getAllPosts().subscribe((response: any) => {
      // console.log(response)
      localStorage.setItem('bloggerPosts', JSON.stringify(response.items));    
    });
  }   

  getPostInstagram() {    
    this.instagramService.GetAll().subscribe((response: any) => {  
      // console.log(response)
      localStorage.setItem('instagramPosts', JSON.stringify(response.data));   
    });
  }

  about(): void{    
    this.router.navigate(['/sobre'], { relativeTo: this.route });
    //  this.closePanel();
  }

  whatsapp(): void{    
    const phoneNumber = '71992117598';
    const message = encodeURIComponent('Olá! Gostaria de agendar uma consulta.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(PopupComponent, {
  //     panelClass: 'custom-dialog-container'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //    this.atendimento = localStorage.getItem('tipoAtendimento');

  //    if(this.atendimento === "Adulto"){
  //     this.imagem = true;
  //    }else{
  //     this.imagem = false;
  //    }
  //   });
  // }
}
