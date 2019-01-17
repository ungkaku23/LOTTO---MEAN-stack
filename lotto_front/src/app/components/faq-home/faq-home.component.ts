import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaqService } from '../../services/faqService';

@Component({
  selector: 'app-faq-home',
  templateUrl: './faq-home.component.html',
  styleUrls: ['./faq-home.component.css']
})
export class FaqHomeComponent implements OnInit {

  searchval: any = '';
  SearchedFaq: any = [];

  constructor(private router: Router,
              private faqService: FaqService) { }

  ngOnInit() {
    
    
  }

  loadSearchedFaq()
  {
    this.SearchedFaq = this.faqService.doSearch(this.searchval);
    console.log('sf : ' + JSON.stringify(this.SearchedFaq));
  }

  goToFAQCategory(id)
  {
    this.router.navigate(['/loto/faq-category/' + id]);
  }

}
