import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  headers = new HttpHeaders({
    authorization: 'testAuthorization',
    apiKeyToken: 'testApiKeyToken'
  });

  signIn(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/auth/signIn`,{request}, {headers: this.headers});
  }
}
