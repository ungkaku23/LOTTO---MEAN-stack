import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

declare var $: any;

@Component({
  selector: 'app-bet3-rules',
  templateUrl: './bet3-rules.component.html',
  styleUrls: ['./bet3-rules.component.css']
})
export class Bet3RulesComponent implements OnInit {

  tabIndObj = {ind1: 1, ind2: 2, ind3: 1};
  tabIndex = 1;

  TL_status: any = 0;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  updateTL_status(ev) {
    this.TL_status = ev;
  }

  setTabInfo(tabindex) {
    this.tabIndex = tabindex;

    switch(this.tabIndex) {
      case 0:
        this.router.navigate(['/loto/bet3-play-buyticket']);
        break;
      case 1:
        this.router.navigate(['/loto/bet3-play-rules']);
        break;
      case 2:
        this.router.navigate(['/loto/bet3-play-archive']);
        break;
    }
  }

}
