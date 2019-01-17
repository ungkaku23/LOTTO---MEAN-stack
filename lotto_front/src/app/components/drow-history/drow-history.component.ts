import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrawService } from '../../services/draw.service';

@Component({
  selector: 'app-drow-history',
  templateUrl: './drow-history.component.html',
  styleUrls: ['./drow-history.component.css']
})
export class DrowHistoryComponent implements OnInit {

  tid = 1;
  history: any = [];

  paginatedData: any = [];
  paginater: any = {pages: 1, per_page: 10};
  totalPages: any;

  paginatedData_bit4: any = [];
  paginater_bit4: any = { pages: 1, per_page: 10 };
  totalPages_bit4: any;

  constructor(private activatedRouter: ActivatedRoute,
              private drawService: DrawService) { }

  ngOnInit() {
    for(let i=0; i<138; i++ )
      this.history.push(i);
    
    this.activatedRouter.params.subscribe(param => {
      if (param['tid'] !== undefined)
      {
        this.tid = param['tid'];

        if (param['pages'] !== undefined) {
          if (this.tid == 1) {//page 3
            this.paginater.pages = param['pages'];
          }
          if (this.tid == 2) {//page 4
            this.paginater_bit4.pages = param['pages'];
          }
        }
        if (param['per_page'] !== undefined) {
          if (this.tid == 1) {//page 3
            this.paginater.per_page = param['per_page'];
          }
          if (this.tid == 2) {//page 4
            this.paginater_bit4.per_page = param['per_page'];
          }
        }
      }

      this.loadPaginatedData(3);
      this.loadPaginatedData(4);
    });

  }

  setTotalPages(pagenum) {
    this.totalPages = pagenum;
  }
  loadPaginatedData(type) {
    if(type === 3) //bit 3
    {
      this.paginatedData = [];
      this.drawService.loadDrawHistory({type: 0, status: 1, pgData: this.paginater}).subscribe(data => {
        this.paginatedData = data.data;

        let temtotal = (data.total - (data.total % this.paginater.per_page)) / this.paginater.per_page;
        if(data.total % this.paginater.per_page > 0) {
          temtotal += 1;
          this.totalPages = temtotal;
        }
        console.log('tp : ' + this.totalPages);

      }, err => {
        console.log('bit3 : ' + err);
      });


      /*
      this.totalPages = Math.round(this.history.length / this.paginater.per_page);
      let limiter;
      if (this.paginater.pages === this.totalPages)
      {
        limiter = 138;
      }
      else
      {
        limiter = this.paginater.pages * this.paginater.per_page;
      }
      
      for (let i = (this.paginater.pages - 1) * this.paginater.per_page; i < limiter; i++)
      {
        this.paginatedData.push(this.history[i]);
      } */
    }
    else
    {
      this.paginatedData_bit4 = [];
      this.drawService.loadDrawHistory({type: 1, status: 1, pgData: this.paginater_bit4}).subscribe(data => {
        this.paginatedData_bit4 = data.data;

        let temtotal = (data.total - (data.total % this.paginater_bit4.per_page)) / this.paginater_bit4.per_page;
        if(data.total % this.paginater_bit4.per_page > 0) {
          temtotal += 1;
          this.totalPages_bit4 = temtotal;
        }
        console.log('tp4 : ' + this.totalPages_bit4);

      }, err => {
        console.log('bit4 : ' + err);
      });
    }
  }

  getTidFromTab(id) {
    this.tid = id;
  }

  getPageindexFromPaginatewidget(pindex, type) {
    if(type === 3)
    {
      this.paginater.pages = pindex;
    }
    if (type === 4) {
      this.paginater_bit4.pages = pindex;
    }
    
    this.loadPaginatedData(type);
  }

}
