import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/map';

@Injectable()
export class TitleService {
    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private translateService: TranslateService) { }

    setTitle() {
        let pptitle = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        console.log('sss : ' + pptitle);

        this.translateService.get(pptitle).subscribe(pptitle_results => {
            this.translateService.get('#sitename').subscribe(sitename_results => {
                this.titleService.setTitle(pptitle_results + ' | ' + sitename_results);
            });
        });
        
    }

    getTitle(state, parent) {
        let data = [];
        if (parent && parent.snapshot.data && parent.snapshot.data.title) {
            data.push(parent.snapshot.data.title);
        }

        if (state && parent) {
            data.push(... this.getTitle(state, state.firstChild(parent)));
        }
        return data;
    }

}