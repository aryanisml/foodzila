import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageService } from '../helpers/storage.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit, OnDestroy {

  private $destroy: Subject<boolean> = new Subject<boolean>();
  private receipename: any;
  showMore = false;
  showResource = `Show More`;
  public get receipeName(): any {
    return this.receipename;
  }
  public set receipeName(v: any) {
    this.receipename = v;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService) {
    this.setReceipeName();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  setReceipeName(): void {
    this.route.data
      .pipe(takeUntil(this.$destroy))
      .subscribe((response) => {
        this.receipeName = response.foodData[0];
        this.showMore = false;
        this.showResource = `Show More`;
      });
  }

  show(): void {
    this.showMore = !this.showMore;
    this.showResource = this.showMore ? `Show Less` : `Show More`;
    if (this.showMore) {
      this.router.navigate([`food/${this.route.snapshot.params.name}/receipe`]);
    } else {
      this.router.navigate([`food/${this.route.snapshot.params.name}`]);
    }
  }

  fav(): void {
    const key = this.route.snapshot.params.name;
    const storage: any = this.storageService.getStorageMap(key);
    if (!storage) {
      this.storageService.setStorageMap(key, { fav: 1 });
    } else {
      const cn = Number(storage.fav) + 1;
      this.storageService.setStorageMap(key, { fav: cn });
    }
    const cnValue = this.storageService.countBehaviourSubject.getValue();
    this.storageService.countBehaviourSubject.next(cnValue !== undefined ? Number(cnValue) + 1 : 0);
  }




}
