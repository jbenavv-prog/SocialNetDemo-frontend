import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    authorization: 'testAuthorization',
    apiKeyToken: 'testApiKeyToken'
  });

  create(request: any) {
    return this.http.post(`${environment.apiUrl}/api/publication/createReaction`, { request }, { headers: this.headers });
  }
}
