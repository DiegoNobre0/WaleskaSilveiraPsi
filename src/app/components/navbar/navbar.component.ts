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

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isHomePage = event.url === '/' || event.url === '/home';
        this.sidebarVisible = false; // Fecha o menu ao navegar
        this.checkScroll();
      });
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