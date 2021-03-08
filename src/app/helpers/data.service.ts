import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  get(paramsUrl?: string, httpOptions?: {}): Observable<any> {
    const url = paramsUrl ? environment.mainUrl + '' + paramsUrl : environment.mainUrl;
    return this.httpClient.get(`${url}`
      , { ...httpOptions })
      .pipe(map(response => this.handleResponse(response),
        catchError(error => error)));
  }

  private handleResponse(res: Response | any): any {
    if (res.constructor === HttpResponse) {
      return res;
    } else {
      return res.body ? res.body : res || {};
    }
  }




}
