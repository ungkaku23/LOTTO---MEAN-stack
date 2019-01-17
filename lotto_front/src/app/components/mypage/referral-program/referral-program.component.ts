import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-referral-program',
  templateUrl: './referral-program.component.html',
  styleUrls: ['./referral-program.component.css']
})
export class ReferralProgramComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goReferalTerms() {
    this.router.navigate(['/loto/my-referral']);
  }

}
