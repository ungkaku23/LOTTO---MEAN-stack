import { Component, OnInit, HostListener } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TitleService } from '../../services/titleService';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { LotoAuthService } from "../../services/auth.service";
import { SocketService } from "../../services/socket.service";

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"]
})

export class ContainerComponent implements OnInit {
  
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private translateService: TranslateService,
              private mytitle: TitleService,
              private authService: LotoAuthService,
              private socketService: SocketService) {
      
  }

  ngOnInit() {

    console.log("container!!!");
    this.checkTokenExpiredOrNot();

    this.socketService.pushNotification_socketConfiguration();

    this.defaultTitle();
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((evt) => {

        this.checkTokenExpiredOrNot();

        this.mytitle.setTitle();
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scroll(0, 0);
    });

  }

  checkTokenExpiredOrNot() {
    if(!this.authService.loggedIn()) {
      this.authService.logOut();
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if ($(window).scrollTop() > 50) {
      $('.scrolltop:hidden').stop(true, true).fadeIn();
    }
    else{
      $('.scrolltop').stop(true, true).fadeOut();
    }
  }


  clickedSTT()
  {
    $('html,body').animate({ scrollTop: $('.tophere').offset().top - 200 }, '1000');
    return false;
  }

  defaultTitle() {
    setTimeout(() => {
      console.log('default tranlste');
      let lang = localStorage.getItem('language');
      if (lang == null) {
        this.translateService.use('en');
        lang = 'en';
      }
      else {
        this.translateService.use(lang);
      }
      this.mytitle.setTitle();
    }, 100);

  }

}
