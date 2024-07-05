import { Component, HostListener, ElementRef, OnInit, OnDestroy, ApplicationRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


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
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'whatsapp',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/whatsapp.svg')
    );
  }

  atendimento: any;
  imagem: any;
  exibirModal: boolean = false;

  goToItems() {
   this.router.navigate(['/lista-antibiotico'], { relativeTo: this.route });
  }

  ngOnInit(){   
    // this.openDialog();
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
