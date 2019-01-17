import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-referrals',
  templateUrl: './my-referrals.component.html',
  styleUrls: ['./my-referrals.component.css']
})
export class MyReferralsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotocheckReferrel() {
    this.router.navigate(['/loto/mypage-account/1']);
  }

}
