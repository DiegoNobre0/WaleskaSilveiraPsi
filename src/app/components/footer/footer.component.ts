import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(
    private fb: FormBuilder,
    private emailService: EmailService  
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern('^\\d{2}\\d{4,5}\\d{4}$')]],
      message: ['', Validators.required]
    }); 
  }

  contactForm: FormGroup;


  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
     
    } else {      
      this.emailService.postEmail(this.contactForm.value).subscribe(
        () => {         
          alert('E-mail enviado com sucesso!');
          this.contactForm.reset(); 
        },
        (error) => {
          console.error('Erro ao postar comentário:', error);
          alert('Erro ao enviar o e-mail. Por favor, tente novamente mais tarde.');
        }
      );
      
    }
  }

}
