// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmailService {
//   constructor(private httpClient: HttpClient) { }


// postEmail(data: any): Observable<any> { 
 
//   const url = 'https://app-wspsi-backend-v2.vercel.app/send-form'; 
  

//   return this.httpClient
//     .post(url, data)
//     .pipe(catchError(this.handleError));
// }

//   private handleError(error: HttpErrorResponse): Observable<any> {
//     let errorMessage = '';
//     if (error.error instanceof ErrorEvent) {
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.error(errorMessage);
//     return throwError(errorMessage);
//   }
// }
import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  // PREENCHA COM SEUS DADOS DO EMAILJS
  private serviceID = 'service_da2s0pk'; 
  private templateID = 'template_slxaze7';
  private publicKey = 'yRTUu47W9Irt21p2n';

  constructor() {
    // Inicializa o EmailJS
    emailjs.init(this.publicKey);
  }

  async sendEmail(formValues: any) {
   
    try {
      // Mapeia os dados do formulário para as variáveis do seu Template no site
      // O lado ESQUERDO deve ser igual às variáveis {{...}} que você criou no site
      const templateParams = {
        name: formValues.name,
        email: formValues.email,
        number: formValues.number, // Se tiver {{number}} no seu template
        message: formValues.message
      };

      const response = await emailjs.send(
        this.serviceID, 
        this.templateID, 
        templateParams
      );

      console.log('Email enviado!', response.status, response.text);
      
    } catch (error) {
      console.error('Erro no EmailJS:', error);
      throw error; // Lança o erro para o componente tratar
    }
  }


  // email.service.ts
async sendCommentNotification(data: any, token: string, id: string): Promise<void> {
  // Construa os links aqui no front
  const baseUrl = window.location.origin; // Pega 'http://localhost:4200' ou 'seu-site.com' automaticamente
  const approveLink = `${baseUrl}/approve-comment?id=${id}&token=${token}`;
  const rejectLink = `${baseUrl}/reject-comment?id=${id}&token=${token}`;

  const templateParams = {
    name: data.name,
    email: data.email,
    comment: data.comment,
    approve_link: approveLink,
    reject_link: rejectLink
  };

  // Use o ID do NOVO template que você criou para comentários
  await emailjs.send(this.serviceID, 'template_sc17e6q', templateParams);
}
}