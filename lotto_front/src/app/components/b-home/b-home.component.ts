import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-b-home',
  templateUrl: './b-home.component.html',
  styleUrls: ['./b-home.component.css']
})
export class BHomeComponent implements OnInit {

  TL3_status: any = 0;
  TL4_status: any = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    
  }

  updateTL3_status(ev) {
    this.TL3_status = ev;
  }
  updateTL4_status(ev) {
    this.TL4_status = ev;
  }

  goToPlaying(type) {
    if(type == 3)
    {
      this.router.navigate(['/loto/bet3-play-buyticket']);
    }
    if(type == 4)
    {
      this.router.navigate(['/loto/bet4-play-buyticket']);
    }
  }


}
