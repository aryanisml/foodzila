import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods/foods.component';
import { ResolverService } from './helpers/resolver.service';
import { FoodDetailsComponent } from './foods/food-details/food-details.component';
import { RouteGuard } from './helpers/route.guard';
import { FavouriteComponent } from './favourite/favourite.component';
import { TitleComponent } from './title/title.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'food/:name',
    component: FoodsComponent,
    resolve: {
      foodData: ResolverService
    },
    children: [{
      path: 'receipe',
      component: FoodDetailsComponent,
    }],
    canActivateChild: [RouteGuard]
  }, {
    path: 'fav',
    component: FavouriteComponent
  },
  {
    path: '',
    component: TitleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
