import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './_models';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  headers = new HttpHeaders({
    authorization: 'testAuthorization',
    apiKeyToken: 'testApiKeyToken'
  });

  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  login(user: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/authenticate`, user, { headers: this.headers })
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  register(user: any) {
    return this.http.post(`${environment.apiUrl}/api/auth/register`, user, { headers: this.headers });
  }
}
