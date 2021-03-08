import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FoodService } from './food.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {

  constructor(private foodService: FoodService) { }

  resolve(route: ActivatedRouteSnapshot): any {
    // return this.getFoodData(route).find(d => d.name === route.params.name);
    return this.getFoodData(route);
  }

  private getFoodData(route: ActivatedRouteSnapshot): any {
    return this.foodService.getFoodByName(route.params.name).
      pipe(map(response => response));
  }
}
