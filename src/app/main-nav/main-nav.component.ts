import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { FoodService } from '../helpers/food.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../helpers/storage.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  sideNavItem: any;
  favCount;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private foodSerivce: FoodService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService) {
    this.setNavigation();
    this.setFavCount();
  }

  private destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setNavigation(): any {
    this.foodSerivce.getMenuItem()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.sideNavItem = response;
      });
  }

  setFavCount(): void {
    this.storageService.countBehaviourSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        const param = this.activatedRoute?.snapshot?.firstChild?.params?.name;
        if (param && param !== 'fav') {
          this.favCount = response;
        } else {
          this.favCount = '';
        }
      });

  }




}
