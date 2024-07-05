import { FormBuilder } from '@angular/forms';
import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
// import { PopupCadastroMedicamentoComponent } from '../popup-cadastro-medicamento/popup-cadastro-medicamento.component';
// import { MatDialog } from '@angular/material/dialog';
// import { MedicamentosService } from 'src/app/services/medicamentos.service';
// import { Medicamento } from 'src/app/model/medicamento';
// import { PopupLoginComponent } from '../popup-login/popup-login.component';
// import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // public dialog: MatDialog,
    private route: ActivatedRoute,
    // private medicamentosService: MedicamentosService,
    // private loginService: LoginService
    ) {}

  rotaAtual = ""
  panelOpenState : boolean = false;
  loginLogout : boolean = false;

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.rotaAtual = this.activatedRoute?.root?.firstChild?.snapshot?.routeConfig?.path ?? ""
        this.onWindowScroll();
      });
      // this.confirmToken();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(){    
    const nav = this.elementRef.nativeElement.querySelector('#nav');

    if (this.rotaAtual === "" && window.scrollY > 90) {
      nav.style.background = '#fff';
      return
    }

    if (window.scrollY === 0) {
      nav.style.background = 'transparent';
      return;
    }

    if(this.rotaAtual){
      nav.style.background = '#fff';
      return
    }
    nav.style.background = 'transparent';
  }

  home(): void{
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  about(): void{
    this.router.navigate(['/sobre'], { relativeTo: this.route });
  }
 
  service(): void{
    this.router.navigate(['/servicos'], { relativeTo: this.route });
  }

  blog(): void{
    this.router.navigate(['/blog'], { relativeTo: this.route });
  }

  // openDialogLogin(): void {
  //   const dialogRef = this.dialog.open(PopupLoginComponent, {
  //     panelClass: 'custom-dialog-container-login',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.login(result)
  //   });
  // } 

  // login(login : any){ 
  //   this.loginService.signIn(login).subscribe((res: any) => {
  //     localStorage.setItem('access_token', res.token);
  //     localStorage.setItem('loginLogout', 'true');
  //     this.confirmToken()
  //   });
  // }  

  // confirmToken(){
  //   var access_token = this.loginService.getToken()
    
  //   if(access_token  != null){  
  //     this.loginLogout = true;
  //     //this.router.navigate(['/adm'], { relativeTo: this.route });
  //   }
  // }

  // logout(){
  //   localStorage.removeItem('access_token');
  //   localStorage.setItem('loginLogout', 'false');
  //   this.loginLogout = false;
  //   this.loginService.doLogout();
  // }
}
