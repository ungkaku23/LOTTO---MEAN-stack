import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bit-tabs',
  templateUrl: './bit-tabs.component.html',
  styleUrls: ['./bit-tabs.component.css']
})
export class BitTabsComponent implements OnInit {

  @Input() tid: any;
  @Output() myevent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickedTabs(id) {
    this.myevent.next(id);
  }

}
