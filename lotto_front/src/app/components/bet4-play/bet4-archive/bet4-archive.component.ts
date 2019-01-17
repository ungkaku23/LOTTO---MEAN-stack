import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LotteryService } from '../../../services/lottery.service';

declare var $: any;

@Component({
  selector: 'app-bet4-archive',
  templateUrl: './bet4-archive.component.html',
  styleUrls: ['./bet4-archive.component.css']
})
export class Bet4ArchiveComponent implements OnInit {

  tabIndObj = {ind1: 1, ind2: 2, ind3: 3};
  tabIndex = 2;

  history: any = [];

  paginatedData_bit4: any = [];
  paginater_bit4: any = { pages: 1, per_page: 10 };
  totalPages_bit4: any;

  viewMoreNum: any = -1;

  TL_status: any = 0;

  constructor(private router: Router,
              private lotteryService: LotteryService) { }

  ngOnInit() {

    for(let i=0; i<138; i++ )
      this.history.push(i);

    this.loadPaginatedData();

  }

  updateTL_status(ev) {
    this.TL_status = ev;
  }

  loadPaginatedData() {
    this.paginatedData_bit4 = [];
    this.lotteryService.loadLotteryArchiveData({
        type: 1, 
        pages: this.paginater_bit4.pages, 
        per_page: this.paginater_bit4.per_page}).subscribe(data => {
          console.log('paginated data: ' + JSON.stringify(data));
          this.paginatedData_bit4 = data.data;

          let temtotal = (data.total - (data.total % this.paginater_bit4.per_page)) / this.paginater_bit4.per_page;
          if(data.total % this.paginater_bit4.per_page > 0) {
            temtotal += 1;
            this.totalPages_bit4 = temtotal;
          }
          
          console.log('tp : ' + this.totalPages_bit4);

    }, err => {
      console.log('bit3 : ' + err);
    });
  }

  getPageindexFromPaginatewidget(pindex) {
    this.viewMoreNum = -1;
      this.paginater_bit4.pages = pindex;
    
    this.loadPaginatedData();
  }

  checkCaretVal(vnum , bi, si) {
    if(si > 0) {
      if(vnum == bi) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  caret_clicked(val) {
    this.viewMoreNum = val;
    let flager = 0;
    let thisup = 0;

    console.log('#careticon' + val);
    if($('#careticon' + val).hasClass('fa-caret-up'))
    {
      thisup = 1;
      
    }
    $('.cicon').removeClass('fa-caret-up');
    $('.cicon').addClass('fa-caret-down');
    if(thisup == 1)
    {
      console.log('up???');
      $('#careticon' + val).removeClass('fa-caret-down');
      $('#careticon' + val).addClass('fa-caret-up');
    }

    if($('#careticon' + val).hasClass('fa-caret-down'))
    {
      if(flager == 0)
      {
        console.log('down');
        $('#careticon' + val).removeClass('fa-caret-down');
        $('#careticon' + val).addClass('fa-caret-up');
        flager = 1;
        
      }
    }
    if($('#careticon' + val).hasClass('fa-caret-up'))
    {
      if(flager == 0)
      {
        console.log('up');
        $('#careticon' + val).removeClass('fa-caret-up');
        $('#careticon' + val).addClass('fa-caret-down');
        flager = 1;
        this.viewMoreNum = -1;
      }
    }
  }

  setTabInfo(tabindex) {
    this.tabIndex = tabindex;

    switch(this.tabIndex) {
      case 0:
        this.router.navigate(['/loto/bet4-play-buyticket']);
        break;
      case 1:
        this.router.navigate(['/loto/bet4-play-rules']);
        break;
      case 2:
        this.router.navigate(['/loto/bet4-play-archive']);
        break;
    }
  }

}
