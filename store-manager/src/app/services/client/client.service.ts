import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from 'src/app/shared/constants/constants.enum';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  public getTotalClients(): Observable<any> {
    return this.http.get<any>(URL.API + 'client/total');
  }

  public addClient(client: any): Observable<any> {
    return this.http.post(URL.API + 'client/addClient', client);
  }

  public listClients(): Observable<any> {
    return this.http.get(URL.API + 'client');
  }
}
