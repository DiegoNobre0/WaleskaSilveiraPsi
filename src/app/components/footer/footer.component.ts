import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(
    private fb: FormBuilder  
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]],
      message: ['', Validators.required]
    }); 
  }

  contactForm: FormGroup;


  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
     
    } else {
      console.log(this.contactForm.value);
      // Adicione a lógica para enviar os dados do formulário para um servidor aqui
    }
  }
}
