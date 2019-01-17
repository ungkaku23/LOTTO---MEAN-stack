import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-pagination-widget',
  templateUrl: './pagination-widget.component.html',
  styleUrls: ['./pagination-widget.component.css']
})
export class PaginationWidgetComponent implements OnInit {

  @Input() total: any;
  @Input() current_pos: any;
  @Output() paginateEvent: EventEmitter<any> = new EventEmitter;

  @Input()
  set setTotal(value: string) {
     this.total = value;
     this.ngOnInit();
  }

  pos: any = 1;
  widgets: any = [];

  private timer: number;

  constructor() { }

  ngOnInit() {

    this.pos = parseInt(this.current_pos);
    this.getPaginatedWidgets();

    this.timer = setTimeout(() => {
      this.setStyles();
    }, 10);

  }

  getPaginatedWidgets()
  {
    console.log('total : ' + this.total);
    console.log('pos : ' + this.pos);

    this.widgets = [];

    if ((this.pos - 2) >= 1)
    {
      this.widgets.push(this.pos - 2);
    }
    if ((this.pos - 1) >= 1) {
      this.widgets.push(this.pos - 1);
    }
    this.widgets.push(this.pos);

    let current_length = this.widgets.length;
    // console.log('c len : ' + current_length);
    for (let i = 0; i < (5 - current_length); i++)
    {
      // console.log('qq: ' + (this.pos + i + 1));
      if ((this.pos + i + 1) <= this.total) {
        // console.log('ww');
        this.widgets.push(this.pos + i + 1);
      }
    }

    current_length = this.widgets.length;
    for (let i = 0; i < (5 - current_length); i++)
    {
      if ((this.widgets[0] - 1) >= 1) {
        let temp = [ this.widgets[0] - 1 ];
        this.widgets = temp.concat(this.widgets);
      }
    }

    if((this.widgets[0] - 2) >= 1)
    {
      let temp = [ 1, '...' ];
      this.widgets = temp.concat(this.widgets);
    }
    if ((this.widgets[0] - 1) === 1) {
      let temp = ['...'];
      this.widgets = temp.concat(this.widgets);
    }
    if ((this.widgets[this.widgets.length - 1] + 2) <= this.total) {
      let temp = ['...', this.total];
      this.widgets = this.widgets.concat(temp);
    }
    if ((this.widgets[this.widgets.length - 1] + 1) === this.total) {
      let temp = ['...'];
      this.widgets = this.widgets.concat(temp);
    }

    console.log('widgets : ' + this.widgets);

    this.setStyles();
  }

  setStyles()
  {
    console.log('pos : ' + this.pos);
    console.log('len : ' + this.widgets.length);
    $('.pclass').removeClass('current');
    $('#pitems' + this.pos).addClass('current');
  }

  clickedPaginate(na)
  {
    if(na !== '...')
    {
      this.pos = na;
      this.getPaginatedWidgets();
      this.paginateEvent.next(na);
    }
  }

  next()
  {
    if (this.pos < this.total) {
      this.pos = parseInt(this.pos) + 1;
      this.getPaginatedWidgets();
      this.paginateEvent.next(this.pos);
    }
  }

  prev()
  {
    if (this.pos > 1) {
      this.pos = parseInt(this.pos) - 1;
      this.getPaginatedWidgets();
      this.paginateEvent.next(this.pos);
    }
  }

}
