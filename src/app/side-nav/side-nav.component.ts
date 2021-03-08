import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  sideNavItem: any;
  constructor() { }

  ngOnInit(): void {
    this.sideNavItem = this.getTempNav();
  }

  getTempNav(): any {
    return [{
      name: 'North Indian',
      childern: [{
        name: 'Biryani'
      }, {
        name: 'Paratha'
      }, {
        name: 'Paneer'
      }]
    },
    {
      name: 'South Indian',
      childern: [{
        name: 'Ideali'
      }, {
        name: 'Uttapa'
      }, {
        name: 'Dosa'
      }]
    }];
  }

}
