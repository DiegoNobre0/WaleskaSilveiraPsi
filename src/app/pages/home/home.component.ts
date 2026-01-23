import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BloggerService } from 'src/app/services/blogger.service';
import { instagramService } from 'src/app/services/instagram.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bloggerService: BloggerService,
    private instagramService: instagramService
  ) {}

  ngOnInit() {   
    this.prefetchData();
  }

  // Busca dados em segundo plano (Opcional se não mostrar na Home)
  prefetchData() {    
    this.bloggerService.getAllPosts().subscribe((response: any) => {
      localStorage.setItem('bloggerPosts', JSON.stringify(response.items));    
    });

    this.instagramService.GetAll().subscribe((response: any) => {  
      localStorage.setItem('instagramPosts', JSON.stringify(response.data));   
    });
  }

  // Navegação
  about(): void {    
    this.router.navigate(['/sobre'], { relativeTo: this.route });
  }

  whatsapp(): void {    
    const phoneNumber = '71992117598';
    const message = encodeURIComponent('Olá! Gostaria de agendar uma consulta.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}