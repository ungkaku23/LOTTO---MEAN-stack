import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-mypage-message',
  templateUrl: './mypage-message.component.html',
  styleUrls: ['./mypage-message.component.css']
})
export class MypageMessageComponent implements OnInit {

  tabIndObj = {ind1: 2, ind2: 3, ind3: 4, ind4: 5, ind5: 6, ind6: 1};
  tabIndex = 4;

  msgDatas: any = [];

  msgItemClicked: any = -1;
  msgClickedContents: any = {};

  mydata: any = {};
  baseUrl: any = '';

  constructor(private router: Router) { }

  ngOnInit() {

    this.baseUrl = environment.base_url;
    this.mydata = JSON.parse(localStorage.getItem('userData'));

    for(let i = 0; i < 10; i++)
    {
      this.msgDatas.push({
        title: 'MSG ' + i + 'Text text Text text Text text Text text Text text Text text Text',
        date: '2018.06.0' + i,
        msg_contents: ' <img src="https://backend.sharemeshi.com/frontend/images/news/img_news_20180704.jpg"> \r\n\r\n 大田区の有力メディア、大田区タイムズの編集会議にご招待頂き、ライターのみなさまへシェアメシ の事業内容をプレゼンテーションをさせて頂きました！ \r\n\r\n ママライターの方からは「自分は里帰り出産ではなく料理が大変だった、出産後の大変な時期にこのサービスが始まっていたら是非利用したかった」等、ご意見いただいたり、サービスの広け方のアドバイスなどについてご意見頂きました。\r\n\r\n <a href="https://otaku-times.com/12101/">https://otaku-times.com/12101/</a>'
      });
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

  isEmpty(obj) {
      for(let key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
  }

  clickedMsgItem(index) {
    this.msgItemClicked = index;
    this.msgClickedContents = this.msgDatas[index];

    setTimeout(() => {
      $('.msgd_details .col-md-12 img').css('width' , '100%');
    }, 100);
  }

}
