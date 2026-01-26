  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class CommentService {
    private apiUrl = 'https://app-wspsi-backend-v2.vercel.app';
    // private apiUrl = 'http://localhost:3333';

    constructor(private http: HttpClient) {}

  approveComment(id: string, token: string): Observable<any> {
    // CORREÇÃO: Mude de /approve-comment para /comments/approve
    return this.http.post(`${this.apiUrl}/comments/approve`, { id, token });
  }

  rejectComment(id: string, token: string): Observable<any> {
    // CORREÇÃO: Mude de /reject-comment para /comments/reject
    return this.http.post(`${this.apiUrl}/comments/reject`, { id, token });
  }
  }
