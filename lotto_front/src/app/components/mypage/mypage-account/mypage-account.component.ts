import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LotoAuthService } from '../../../services/auth.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mypage-account',
  templateUrl: './mypage-account.component.html',
  styleUrls: ['./mypage-account.component.css']
})
export class MypageAccountComponent implements OnInit {

  tabIndObj = {ind1: 6, ind2: 5, ind3: 4, ind4: 3, ind5: 2, ind6: 1};
  tabIndex = 0;

  refVal = 0;

  mydata: any = {};
  baseUrl: any = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: LotoAuthService) { }

  ngOnInit() {

    this.baseUrl = environment.base_url;

    this.activatedRoute.params.subscribe(param => {
      if(param['referral'] != undefined) {
        this.refVal = param['referral'];

        this.mydata = JSON.parse(localStorage.getItem('userData'));
      }
    });
  }

  getMozaikPw(str) {
    if(str != undefined) {
      let mozaikPw = str[0];
      for(let i = 0; i < str.length - 1; i++)
      {
        mozaikPw += '*';
      }
      return mozaikPw;
    }
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

  goToProfileChange() {
    this.router.navigate(['/loto/mypage-settings/1']);
  }

  goToReferralProgram() {
    this.router.navigate(['/loto/referral-program']);
  }

}
