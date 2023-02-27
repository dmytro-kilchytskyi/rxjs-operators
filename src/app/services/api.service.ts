import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private readonly apiHost = 'http://localhost:8080';
  private readonly baseUrl = `${this.apiHost}/slow-request`;

  constructor(private httpClient: HttpClient) {}

  getWithDelay(delay: number = 0): Observable<null> {
    const params = new HttpParams().set('delay', delay);

    return this.httpClient.get<null>(this.baseUrl, { params });
  }
}
