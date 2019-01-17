import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mypage-deposit-withdraw-history',
  templateUrl: './mypage-deposit-withdraw-history.component.html',
  styleUrls: ['./mypage-deposit-withdraw-history.component.css']
})
export class MypageDepositWithdrawHistoryComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if(param['type'] != undefined)
      {
        console.log('type : ' + param['type']);
      }
    });
  }

}
