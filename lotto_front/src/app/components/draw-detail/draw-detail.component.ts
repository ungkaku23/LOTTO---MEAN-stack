import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrawService } from '../../services/draw.service';

declare var $: any;

@Component({
  selector: 'app-draw-detail',
  templateUrl: './draw-detail.component.html',
  styleUrls: ['./draw-detail.component.css']
})
export class DrawDetailComponent implements OnInit {

  tid: any = 1;
  pages: any = 1;
  per_page: any = 10;
  drawindex: any = 1;
  drawData: any = {};

  windowwidth: any = 3000;

  constructor(private activatedRouter: ActivatedRoute,
              private drawService: DrawService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    console.log('resize : ' + ($(window).width()-162));
    this.windowwidth = $(window).width() - 162;

  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(param => {
      if (param['tid'] !== undefined) {
        this.tid = param['tid'];
        if(this.tid == 1)
        {
          $('.detailbox').css('border-image-source', 'url(/assets/imgs/bet3_drawdetail.png)');
        }
        if (this.tid == 2) {
          $('.detailbox').css('border-image-source', 'url(/assets/imgs/bet4_drawdetail.png)');
        }
      }
      if (param['pages'] !== undefined) {
        this.pages = param['pages'];
      }
      if (param['per_page'] !== undefined) {
        this.per_page = param['per_page'];
      }
      if (param['drawindex'] !== undefined) {
        this.drawindex = param['drawindex'];

        this.drawService.loadDrawDetail({id: this.drawindex}).subscribe( data => {
          this.drawData = data[0];
          // console.log('drawData: ' + JSON.stringify(this.drawData));
        }, err => {
          // console.log(err);
        });
      }
    });
    this.windowwidth = $(window).width() - 162;
  }

}
