import { Component, OnInit } from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-lottery-rules',
  templateUrl: './lottery-rules.component.html',
  styleUrls: ['./lottery-rules.component.css']
})
export class LotteryRulesComponent implements OnInit {

  tid = 1;

  constructor() { }

  ngOnInit() {
  }

  getTidFromTab(id) {
    this.tid = id;
  }

}
