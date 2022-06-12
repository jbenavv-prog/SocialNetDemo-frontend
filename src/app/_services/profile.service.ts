import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    authorization: 'testAuthorization',
    apiKeyToken: 'testApiKeyToken'
  });

  getProfile(user: any) {
    return this.http.post(`${environment.apiUrl}/api/profiles/getProfile`, user, { headers: this.headers });
  }

  updatePhotoProfile(formData: any, user: any) {
    const params = new HttpParams({ fromString: `id=${user.id}&idTypePublication=2`});
    return this.http.post<any>(`${environment.apiUrl}/api/profiles/updatePhotoProfile`, formData, { headers: this.headers, params })
    .pipe(map(response => response));
  }
}
