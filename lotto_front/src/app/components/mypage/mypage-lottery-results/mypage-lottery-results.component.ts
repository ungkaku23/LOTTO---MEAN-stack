import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { LotteryService } from '../../../services/lottery.service';

@Component({
  selector: 'app-mypage-lottery-results',
  templateUrl: './mypage-lottery-results.component.html',
  styleUrls: ['./mypage-lottery-results.component.css']
})
export class MypageLotteryResultsComponent implements OnInit {

  tabIndObj = {ind1: 5, ind2: 6, ind3: 4, ind4: 3, ind5: 2, ind6: 1};
  tabIndex = 1;

  tid = 1;

  mydata: any = {};
  baseUrl: any = '';

  statistics_data: any = [];
  lottery_top_result: any = {winning_numbers: []};

  constructor(private router: Router,
              private lotteryService: LotteryService) { }

  ngOnInit() {
    this.baseUrl = environment.base_url;
    this.mydata = JSON.parse(localStorage.getItem('userData'));

    this.loadLotteryResults();
  }

  loadLotteryResults() {
    let ldata = {};
    if(this.tid == 1) {
      ldata = {type: 0};
    } else {
      ldata = {type: 1};
    }
    this.lotteryService.loadLotteryResults(ldata).subscribe( data => {
      this.statistics_data = data;
      console.log('lrdata : ' +JSON.stringify(this.statistics_data));
        this.lotteryService.loadLotteryTopResults(ldata).subscribe( topdata => {
          if(topdata.success == true) {
            console.log('topdata : ' + JSON.stringify(topdata));
            this.lottery_top_result = topdata.data;
          }
        }, toperr => {
          console.log(toperr);
        });
    }, err => {
      console.log(err);
    });
  }

  goToChallenge() {
    if(this.tid == 1) {
      this.router.navigate(['/loto/bet3-play-buyticket']);
    } else {
      this.router.navigate(['/loto/bet4-play-buyticket']);
    }
  }

  getTidFromTab(id) {
    this.tid = id;
    this.loadLotteryResults();
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

}
