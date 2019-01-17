import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

declare var $: any;

@Component({
  selector: 'app-demo-archive',
  templateUrl: './demo-archive.component.html',
  styleUrls: ['./demo-archive.component.css']
})
export class DemoArchiveComponent implements OnInit {

  tabIndObj = {ind1: 1, ind2: 2, ind3: 3};
  tabIndex = 2;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  setTabInfo(tabindex) {
    this.tabIndex = tabindex;

    switch(this.tabIndex) {
      case 0:
        this.router.navigate(['/loto/demo-play-buyticket']);
        break;
      case 1:
        this.router.navigate(['/loto/demo-play-rules']);
        break;
      case 2:
        this.router.navigate(['/loto/demo-play-archive']);
        break;
    }
  }

}
