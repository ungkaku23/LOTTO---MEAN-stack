import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TitleService } from '../../services/titleService';
import { LotoAuthService } from '../../services/auth.service';
import { HeaderService } from "../../services/header.service";
import { environment } from '../../../environments/environment';

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})

export class HeaderComponent implements OnInit {
  
  baseUrl: any = '';

  zleftbtnflag = 0; // hidden;
  zrightbtnflag = 0; // hidden;
  notifymenu = 0; //hidden;

  lang_val: any = '';

  avatarImg: any = '';

  constructor(private router: Router,
              private translateService: TranslateService,
              private mytitle: TitleService,
              private authService: LotoAuthService,
              private headerService: HeaderService) { 
          
              this.headerService.avatarHandle.subscribe(unobj => this.setAvatar());
  }

  ngOnInit() {

    this.baseUrl = environment.base_url;

    let lang = localStorage.getItem('language');
    if (lang == null) {
      this.translateService.use('en');
      this.lang_val = 'en';
    }
    else {
      this.translateService.use(lang);
      this.lang_val = lang;
    }

    $(document).click(function(event) {
      if(event.target.id == '')
      {
        document.getElementById('wom').click();
      }
    });

    this.setAvatar();

  }

  langChanged() {
    localStorage.setItem('language', this.lang_val);
    this.translateService.use(this.lang_val);
    this.mytitle.setTitle();
  }

  resetMenuToggle() {
    this.zleftbtnflag = 0;
    $('#leftdropdown').removeClass('show');

    this.zrightbtnflag = 0;
    $('#rightdropdown').removeClass('show');

    this.notifymenu = 0;
    $('#notify_popup').removeClass('show');
  }

  clickedZleftbtn() {
    if ($('#leftdropdown').hasClass('show'))
    {
      this.zleftbtnflag = 0;
      $('#leftdropdown').removeClass('show');
    }
    else
    {
      this.zleftbtnflag = 1;
      $('#leftdropdown').addClass('show');
    }
  }

  clickedLdditem(lid) {
    $('#leftdropdown').removeClass('show');
    this.zleftbtnflag = 0;

    $('.ldd_item').removeClass('ddactive');
    $(lid).addClass('ddactive');

    if(lid == '#ldd_item4') {
      localStorage.setItem('goParam', '1');
    }
  }



  clickedZrightbtn() {
    if ($('#rightdropdown').hasClass('show'))
    {
      this.zrightbtnflag = 0;
      $('#rightdropdown').removeClass('show');
    }
    else
    {
      this.zrightbtnflag = 1;
      $('#rightdropdown').addClass('show');
    }
  }

  clickedRdditem(lid) {
    $('#rightdropdown').removeClass('show');
    this.zrightbtnflag = 0;

    $('.rdd_item').removeClass('ddactive');
    $(lid).addClass('ddactive');

    if(lid == '#rdd_item7')
    {
      $('#lgModal').modal('show');
      /**/
    }
  }


  notify_clicked() {
    if ($('#notify_popup').hasClass('show'))
    {
      this.notifymenu = 0;
      $('#notify_popup').removeClass('show');
    }
    else
    {
      this.notifymenu = 1;
      $('#notify_popup').addClass('show');
    }
  }
  clickednpitem(lid) {
    $('#notify_popup').removeClass('show');
    this.zrightbtnflag = 0;

    $('.np_item').removeClass('ddactive');
    $(lid).addClass('ddactive');

  }

  doLogout() {
    this.authService.logOut();
    
    this.router.navigate(['/']);
    $('#lgModal').modal('hide');
  }

  setAvatar() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    if(userData != undefined) {
      if(userData.avatar != undefined) {
        console.log('avatar : ' + userData.avatar);
        this.avatarImg = userData.avatar;
      } else {
        this.avatarImg = '';
      }
    } else {
      this.avatarImg = '';
    }
  } 

}
