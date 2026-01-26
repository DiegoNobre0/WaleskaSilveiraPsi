import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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
    private emailService: EmailService,
    private messageService: MessageService  
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Regex simples para garantir que tem números suficientes
      number: ['', [Validators.required]], 
      message: ['', Validators.required]
    }); 
  }

   async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.loading = true; // Ativa loading
    this.emailService.sendEmail(this.contactForm.value)
      .then(() => {
        // SUCESSO (equivalente ao next)
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Mensagem enviada. Em breve entrarei em contato.'
        });

        this.contactForm.reset();
      })
      .catch((error) => {
        // ERRO (equivalente ao error)
        console.error('Erro:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao enviar. Tente novamente ou me chame no WhatsApp.'
        });
      })
      .finally(() => {
        // FINALIZAÇÃO (Roda sempre, dando certo ou errado)
        this.loading = false;
      });
  }
}