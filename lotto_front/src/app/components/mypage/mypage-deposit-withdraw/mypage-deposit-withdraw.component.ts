import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import * as WAValidator from 'wallet-address-validator';

import { environment } from '../../../../environments/environment';
import { WithdrawWalletService } from '../../../services/withdraw_wallet.service';

declare var $: any;

@Component({
  selector: 'app-mypage-deposit-withdraw',
  templateUrl: './mypage-deposit-withdraw.component.html',
  styleUrls: ['./mypage-deposit-withdraw.component.css']
})
export class MypageDepositWithdrawComponent implements OnInit {

  tabIndObj = {ind1: 4, ind2: 5, ind3: 6, ind4: 3, ind5: 2, ind6: 1};
  tabIndex = 2;

  amodel: any = {};
  wmodel = {quantity: '', rtotal1: '', priority: '', rtotal2: ''};
  addr_list = [];

  eindex = 1000;

  confirmflag = false;
  pageState: any = '';

  historyData: any = [];

  mydata: any = {};
  baseUrl: any = '';

  ccval: any = '';
  copied: any = false;

  constructor(private router: Router,
              private withdraw_wallet_service: WithdrawWalletService) { }

  ngOnInit() {

    this.baseUrl = environment.base_url;
    this.mydata = JSON.parse(localStorage.getItem('userData'));

    for(let i = 0; i < 20; i++)
    {
      this.historyData.push(i);
    }

    this.pageState = 'home';

    setTimeout(() => {
      $('.dwwalletqr img').css('margin', 'auto');
    }, 100);

    this.loadWithdrawAddress();

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

  loadWithdrawAddress() {
    this.withdraw_wallet_service.loadWithdrawAddress().subscribe( data => {
      if(data.success == true) {
        // console.log('wa data : ' + JSON.stringify(data.data));
        this.addr_list = data.data;
      }
    }, err => {
      console.log(err);
    });
  }

  addrValidator(addr) {
    if(WAValidator.validate(addr, 'BTC')) {
      return true;
    } else {
      return false;
    }
  }

  toClipboard() {
    this.ccval = this.mydata.w_address;
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 1500);
    console.log('ccva : ' + this.ccval);
  }

  doAddAddr(formObj) {
    this.amodel['usage_status'] = 0;
    this.withdraw_wallet_service.saveWithdrawAddress(this.amodel).subscribe(data => {
      if(data.success == true) {
        this.loadWithdrawAddress();

        this.amodel = {};
        formObj.resetForm();
      }
    }, err => {
      console.log(err);
    });
    // this.addr_list.push(newData);
    
  }

  doUpdateAddr(index) {
    console.log("updated : " + JSON.stringify(this.addr_list[index]));

    this.withdraw_wallet_service.updateWithdrawAddress(this.addr_list[index]).subscribe(data => {
      if(data.success == true) {
        this.loadWithdrawAddress();
        this.eindex = 1000;
      }
    }, err => {
      console.log(err);
    });
  }

  removeAddr(index) {

    this.withdraw_wallet_service.removeWithdrawAddress(this.addr_list[index]).subscribe(data => {
      if(data.success == true) {
        this.loadWithdrawAddress();
        this.eindex = 1000;
      }
    }, err => {
      console.log(err);
    });
  }

  doWithdraw() {
    console.log('withdraw : ' + JSON.stringify(this.wmodel));
    this.wmodel = {quantity: '', rtotal1: '', priority: '', rtotal2: ''};
  }

  willEdit(index) {
    this.eindex = index;
  }

  changedUsage(index) {
    console.log('usage : ' + index);
    this.withdraw_wallet_service.updateUsage(this.addr_list[index]).subscribe(data => {
      if(data.success == true) {
        this.loadWithdrawAddress();
      }
    }, err => {
      console.log(err);
    });
  }

  check_confirmflag() {
    if((this.wmodel.quantity != '') && (this.wmodel.rtotal1 != '') && (this.wmodel.priority != '') && (this.wmodel.rtotal2 != ''))
    {
      return true;
    }
    else {
      return false;
    }
  }

  changePageState(type) {
    this.pageState = type;
  }

}
