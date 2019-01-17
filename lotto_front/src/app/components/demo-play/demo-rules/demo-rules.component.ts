import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

declare var $: any;

@Component({
  selector: 'app-demo-rules',
  templateUrl: './demo-rules.component.html',
  styleUrls: ['./demo-rules.component.css']
})
export class DemoRulesComponent implements OnInit {

  tabIndObj = {ind1: 1, ind2: 2, ind3: 1};
  tabIndex = 1;

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
