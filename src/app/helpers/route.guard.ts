import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Injectable()
export class RouteGuard implements CanActivateChild {
  constructor(
    private storageService: StorageService,
    public dialog: MatDialog) {

  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkCount(childRoute);
  }

  checkCount(route): boolean | Observable<boolean> {
    const key = route.parent.params.name;
    const storage: any = this.storageService.getStorageMap(key);
    if (storage && storage.visit) {
      if (Number(storage.visit) >= 5) {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '350px'
        });
        dialogRef.afterClosed()
          .pipe()
          .subscribe(() => {
            return false;
          });
      } else {
        return true;
      }
    } else {
      return true;
    }
  }


}
