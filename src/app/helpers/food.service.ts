import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private dataService: DataService) { }


  getMenuItem(): Observable<any> {
    const paramUrl = `/menu`;
    return this.dataService.get(paramUrl);
  }

  getFoodByName(name): Observable<any> {
    const paramUrl = `/foodItems?name=${name}`;
    return this.dataService.get(paramUrl);
  }
}
