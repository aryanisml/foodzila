import { Component, OnInit } from '@angular/core';
import { StorageService } from '../helpers/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  itemsFav: any;
  constructor(
    private storageService: StorageService,
    private router: Router) {
    this.itemsFav = this.storageService.storageMap;
  }

  ngOnInit(): void {
  }

  navigate(item): void {
    this.router.navigate([`food/${item.key}`]);
  }

}
