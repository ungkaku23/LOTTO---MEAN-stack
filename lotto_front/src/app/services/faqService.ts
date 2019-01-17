import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';

import { general_faq, security_faq, payment_faq, winning_faq, common_faq } from '../const/faqdata';

@Injectable()
export class FaqService {
    constructor() {}

    doSearch(model: any) {
        let data = [];
        let flag = 0;
        for (let i = 0; i < general_faq.length; i++) {
            flag = 0;
            if (general_faq[i].question.indexOf(model) > -1 ) {
                flag = 1;
            }
            else {
               for (let j = 0; j < general_faq[i].answer.length; j++) {
                   if (general_faq[i].answer[j].indexOf(model) > -1) {
                        flag = 1;
                   }
               }
            }
            if (flag === 1) {
                data.push(general_faq[i]);
            }
        }
        for (let i = 0; i < security_faq.length; i++) {
            flag = 0;
            if (security_faq[i].question.indexOf(model) > -1) {
                flag = 1;
            }
            else {
                for (let j = 0; j < security_faq[i].answer.length; j++) {
                    if (security_faq[i].answer[j].indexOf(model) > -1) {
                        flag = 1;
                    }
                }
            }
            if (flag === 1) {
                data.push(security_faq[i]);
            }
        } for (let i = 0; i < payment_faq.length; i++) {
            flag = 0;
            if (payment_faq[i].question.indexOf(model) > -1) {
                flag = 1;
            }
            else {
                for (let j = 0; j < payment_faq[i].answer.length; j++) {
                    if (payment_faq[i].answer[j].indexOf(model) > -1) {
                        flag = 1;
                    }
                }
            }
            if (flag === 1) {
                data.push(payment_faq[i]);
            }
        } for (let i = 0; i < winning_faq.length; i++) {
            flag = 0;
            if (winning_faq[i].question.indexOf(model) > -1) {
                flag = 1;
            }
            else {
                for (let j = 0; j < winning_faq[i].answer.length; j++) {
                    if (winning_faq[i].answer[j].indexOf(model) > -1) {
                        flag = 1;
                    }
                }
            }
            if (flag === 1) {
                data.push(winning_faq[i]);
            }
        }
        return data;
    }

}