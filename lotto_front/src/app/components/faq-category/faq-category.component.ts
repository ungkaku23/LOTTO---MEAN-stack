import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { general_faq, security_faq, payment_faq, winning_faq, common_faq } from '../../const/faqdata';

@Component({
  selector: 'app-faq-category',
  templateUrl: './faq-category.component.html',
  styleUrls: ['./faq-category.component.css']
})
export class FaqCategoryComponent implements OnInit {

  fid: any;
  fdata: any = [];
  fheader: any = '';
  fimglogo: any = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( param => {
      if( param['id'] != undefined )
      {
        console.log('id : ' + param['id']);
        this.fid = param['id'];
        this.loadFData();
      }
    });
  }
  
  loadFData() {
    switch (this.fid) {
      case '1':
        this.fheader = 'General FAQs';
        this.fimglogo = 'assets/imgs/faq_generalicon.png';
        this.fdata = general_faq.concat(common_faq);
        break;
      case '2':
        this.fheader = 'Security & Transparency';
        this.fimglogo = 'assets/imgs/faq_securityicon.png';
        this.fdata = security_faq.concat(common_faq);
        break;
      case '3':
        this.fheader = 'Payment & Purchases';
        this.fimglogo = 'assets/imgs/faq_paymenticon.png';
        this.fdata = payment_faq.concat(common_faq);
        break;
      case '4':
        this.fheader = 'Winnings & Withdrawwals';
        this.fimglogo = 'assets/imgs/faq_winningicon.png';
        this.fdata = winning_faq.concat(common_faq);
        break;
      default:
        break;
    }
  }

}
