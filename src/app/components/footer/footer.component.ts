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
  loading: boolean = false;
  currentYear: number = new Date().getFullYear();

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
    // 1. Validação: Se inválido, marca vermelho e para.
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // 2. Ativa o loading
    this.loading = true;

    try {
      // 3. Tenta enviar (aguarda a resposta)
      await this.emailService.sendEmail(this.contactForm.value);

      // SUCESSO
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Mensagem enviada. Em breve entrarei em contato.'
      });

      this.contactForm.reset();

    } catch (error) {
      // ERRO
      console.error('Erro ao enviar:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao enviar. Tente novamente ou me chame no WhatsApp.'
      });

    } finally {
      // 4. Finalização (Roda sempre)
      this.loading = false;
    }
  }
}