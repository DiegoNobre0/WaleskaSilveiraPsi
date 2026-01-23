import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  
  contactForm: FormGroup;
  loading: boolean = false; // Controle de carregamento

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService  
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Regex simples para garantir que tem números suficientes
      number: ['', [Validators.required]], 
      message: ['', Validators.required]
    }); 
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    } 
      
    this.loading = true; // Ativa loading

    this.emailService.postEmail(this.contactForm.value).subscribe({
      next: () => {         
        alert('E-mail enviado com sucesso!');
        this.contactForm.reset(); 
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao enviar:', error);
        alert('Erro ao enviar o e-mail. Tente novamente mais tarde.');
        this.loading = false;
      }
    });
  }
}