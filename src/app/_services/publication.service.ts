import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    authorization: 'testAuthorization',
    apiKeyToken: 'testApiKeyToken'
  });

  create(formData: any, user: any) {
    const params = new HttpParams({ fromString: `id=${user.id}&idTypePublication=1` });
    return this.http.post<any>(`${environment.apiUrl}/api/publication/create`, formData, { headers: this.headers, params })
      .pipe(map(response => response));
  }
}

