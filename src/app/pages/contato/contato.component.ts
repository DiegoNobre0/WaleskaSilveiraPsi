import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent {
  
  contactForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
        alert('Mensagem enviada com sucesso! Em breve entrarei em contato.');
        this.contactForm.reset(); 
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro:', error);
        alert('Erro ao enviar. Tente novamente ou me chame no WhatsApp.');
        this.loading = false;
      }
    });
  }

  whatsapp(): void {    
    const phoneNumber = '71992117598';
    const message = encodeURIComponent('Olá! Gostaria de agendar uma consulta.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}