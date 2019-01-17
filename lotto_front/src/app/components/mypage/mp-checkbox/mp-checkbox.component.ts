import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mp-checkbox',
  templateUrl: './mp-checkbox.component.html',
  styleUrls: ['./mp-checkbox.component.css']
})
export class MpCheckboxComponent implements OnInit {

  @Input() value;
  @Input() type;
  @Output() sender = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeVal() {
    this.value = !this.value;
    this.sender.emit({val : this.value , type: this.type});
  }

}
