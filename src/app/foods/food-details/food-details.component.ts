import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/helpers/storage.service';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss']
})
export class FoodDetailsComponent implements OnInit {

  receipeItem = null;
  constructor(private route: ActivatedRoute,
              private storageService: StorageService) {
    this.receipeItem = this.route.snapshot.parent.data.foodData[0].receipe;
    this.setVisitCount();
  }

  ngOnInit(): void {
  }

  setVisitCount(): void {
    const key = this.route.snapshot.parent.params.name;
    const storage: any = this.storageService.getStorageMap(key);
    if (!storage) {
      this.storageService.setStorageMap(key, { visit: 1 });
    } else {
      this.storageService.setStorageMap(key, { visit: Number(storage.visit) + 1 });
    }
  }

}
