import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { LotteryService } from '../../../services/lottery.service';

declare var $: any;

@Component({
  selector: 'app-mypage-myhistory',
  templateUrl: './mypage-myhistory.component.html',
  styleUrls: ['./mypage-myhistory.component.css']
})
export class MypageMyhistoryComponent implements OnInit {

  tabIndObj = {ind1: 3, ind2: 4, ind3: 5, ind4: 6, ind5: 2, ind6: 1};
  tabIndex = 3;

  tid = 1;
  history: any = [];

  paginatedData: any = [];
  paginater: any = {pages: 1, per_page: 10};
  totalPages: any;

  paginatedData_bit4: any = [];
  paginater_bit4: any = { pages: 1, per_page: 10 };
  totalPages_bit4: any;

  viewMoreNum: any = -1;

  mydata: any = {};
  baseUrl: any = '';

  constructor(private router: Router,
              private lotteryService: LotteryService) { }

  ngOnInit() {

    this.baseUrl = environment.base_url;
    this.mydata = JSON.parse(localStorage.getItem('userData'));

    for(let i=0; i<138; i++ )
      this.history.push(i);
    
    this.loadPaginatedData(3);
    this.loadPaginatedData(4);
  }

  loadPaginatedData(type) {
    if(type === 3) //bit 3
    {
      this.paginatedData = [];
      this.lotteryService.loadLotteryArchiveData({
          type: 0, 
          pages: this.paginater.pages, 
          per_page: this.paginater.per_page}).subscribe(data => {
            console.log('paginated data: ' + JSON.stringify(data));
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
    }
    else
    {
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
  }

  getTidFromTab(id) {
    this.viewMoreNum = -1;
    this.tid = id;
  }

  getPageindexFromPaginatewidget(pindex, type) {
    this.viewMoreNum = -1;

    if(type === 3)
    {
      this.paginater.pages = pindex;
    }
    if (type === 4) {
      this.paginater_bit4.pages = pindex;
    }
    
    this.loadPaginatedData(type);
  }

  setTabInfo(tabindex) {
    this.tabIndex = tabindex;

    switch(this.tabIndex) {
      case 0:
        this.router.navigate(['/loto/mypage-account/0']);
        break;
      case 1:
        this.router.navigate(['/loto/mypage-lottery-results']);
        break;
      case 2:
        this.router.navigate(['/loto/mypage-deposit-withdraw']);
        break;
      case 3:
        this.router.navigate(['/loto/mypage-myhistory']);
        break;
      case 4:
        this.router.navigate(['/loto/mypage-message']);
        break;
      case 5:
        this.router.navigate(['/loto/mypage-settings/1']);
        break;
    }
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

}
