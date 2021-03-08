import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public storageMap: Map<string, {}>;
  public countBehaviourSubject: BehaviorSubject<number>;
  constructor() {
    this.storageMap = new Map();
    this.countBehaviourSubject = new BehaviorSubject<number>(0);
  }


  getStorageMap(key): {} | null {
    if (this.storageMap.has(key)) {
      return this.storageMap.get(key);
    } else {
      return undefined;
    }
  }

  setStorageMap(key, value): void {
    if (this.storageMap.has(key)) {
      const valueObj: any = this.storageMap.get(key);
      let finalObj: any = {};
      finalObj = {
        visit: (value.visit !== undefined ? value.visit : (valueObj.visit !== undefined ? valueObj.visit : 0)),
        fav: (value.fav !== undefined ? value.fav : (valueObj.fav !== undefined ? valueObj.fav : 0))
      };
      this.storageMap.set(key, finalObj);
    } else {
      this.storageMap.set(key, value);
    }
  }
}
