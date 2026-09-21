import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // Controle de Estado
  isScrolled: boolean = false;
  isHomePage: boolean = true;
  sidebarVisible: boolean = false; // Controle do p-sidebar
  productsDropdownOpen: boolean = false;
  currentUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.urlAfterRedirects || event.url;
        this.isHomePage = this.currentUrl === '/' || this.currentUrl === '/home';
        this.sidebarVisible = false; // Fecha o menu ao navegar
        this.productsDropdownOpen = false;
        this.checkScroll();
      });
  }

  isProductsActive(): boolean {
    return this.currentUrl.includes('/mentoria') || 
           this.currentUrl.includes('/metodo-origem') || 
           this.currentUrl.includes('/origem');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  whatsapp(): void {
    const phoneNumber = '71992117598';
    const message = encodeURIComponent('Olá Waleska! Gostaria de agendar uma sessão.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.sidebarVisible = false;
  }
}