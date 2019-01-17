import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router'

import { trigger, state, animate, transition,
  style } from '@angular/animations';
import { concatAll } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-demo-buyticket',
  templateUrl: './demo-buyticket.component.html',
  styleUrls: ['./demo-buyticket.component.css'],
  animations: [
    trigger('cardSpinner', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, display: 'none', transform: 'translateY(-100%)' })),
      transition('in => out', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('0.1s', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ]),
      transition('out => in', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('0.1s', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class DemoBuyticketComponent implements OnInit {

  tabIndObj = {ind1: 3, ind2: 2, ind3: 1};
  tabIndex = 0;

  currentIndex = [0, 0, 0, 0];
  intervalInstance = [];
  finalLength = 0;
  cardsArray = [];
  chosenArray = [];
  duringChosing = 0;

  windowwidth: any = 3000;


  constructor(private router: Router) { }

  ngOnInit() {
    this.initCards();
    this.windowwidth = $(window).width() - 162;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    console.log('resize : ' + ($(window).width()-162));
    this.windowwidth = $(window).width() - 162;

  }

  initCards()
  {
    this.cardsArray[0] = [
      {index:0, value: 0, state: 'out'},
      {index:1, value: 1, state: 'out'},
      {index:2, value: 2, state: 'out'},
      {index:3, value: 3, state: 'out'},
      {index:4, value: 4, state: 'out'},
      {index:5, value: 5, state: 'out'},
      {index:6, value: 6, state: 'out'},
      {index:7, value: 7, state: 'out'},
      {index:8, value: 8, state: 'out'},
      {index:9, value: 9, state: 'out'}
    ];

    this.cardsArray[1] = [
      {index:0, value: 0, state: 'out'},
      {index:1, value: 1, state: 'out'},
      {index:2, value: 2, state: 'out'},
      {index:3, value: 3, state: 'out'},
      {index:4, value: 4, state: 'out'},
      {index:5, value: 5, state: 'out'},
      {index:6, value: 6, state: 'out'},
      {index:7, value: 7, state: 'out'},
      {index:8, value: 8, state: 'out'},
      {index:9, value: 9, state: 'out'}
    ];

    this.cardsArray[2] = [
      {index:0, value: 0, state: 'out'},
      {index:1, value: 1, state: 'out'},
      {index:2, value: 2, state: 'out'},
      {index:3, value: 3, state: 'out'},
      {index:4, value: 4, state: 'out'},
      {index:5, value: 5, state: 'out'},
      {index:6, value: 6, state: 'out'},
      {index:7, value: 7, state: 'out'},
      {index:8, value: 8, state: 'out'},
      {index:9, value: 9, state: 'out'}
    ];

    this.cardsArray[3] = [
      {index:0, value: 0, state: 'out'},
      {index:1, value: 1, state: 'out'},
      {index:2, value: 2, state: 'out'},
      {index:3, value: 3, state: 'out'},
      {index:4, value: 4, state: 'out'},
      {index:5, value: 5, state: 'out'},
      {index:6, value: 6, state: 'out'},
      {index:7, value: 7, state: 'out'},
      {index:8, value: 8, state: 'out'},
      {index:9, value: 9, state: 'out'}
    ];
  }

  checkTodisplay(arr) {
    if(arr.length != 4)
    {
      return false;
    }
    else {
      if(this.duringChosing != 0)
      {
        return false;
      }
      else {
        for(let i=0; i<arr.length; i++)
        {
          if(arr[i] == null)
          {
            return false;
          }
        }
        return true;
      }
    }
  }

  manualChoose(type) {
    switch (type) {
      case 0: // blue A up
        this.manualUPDOWN(0, 'up');
        break;
      case 1: // blue A down
        this.manualUPDOWN(0, 'down');   
        break;
      case 2: // blue B up
        this.manualUPDOWN(1, 'up');     
        break;
      case 3: // blue B down
        this.manualUPDOWN(1, 'down');   
        break;
      case 4: // blue C up
        this.manualUPDOWN(2, 'up');
        break;
      case 5: // blue C down
        this.manualUPDOWN(2, 'down');   
        break;
      case 6: // blue D up
        this.manualUPDOWN(3, 'up');     
        break;
      case 7: // blue D down
        this.manualUPDOWN(3, 'down');   
        break;
      default:
        break;
    }
  }

  manualUPDOWN(inder, udflag)
  {
    this.cardsArray[inder].forEach(card => card.state = 'out');

    if(udflag == 'up')
    {
      if(this.chosenArray[inder] != undefined)
      {
        this.cardsArray[inder][(this.chosenArray[inder].index + 1) % 10].state = 'in';
        this.chosenArray[inder] = this.cardsArray[inder][(this.chosenArray[inder].index + 1) % 10];
      }
      else
      {
        this.cardsArray[inder][0].state = 'in';
        this.chosenArray[inder] = this.cardsArray[inder][0];
      }
    }
    if(udflag == 'down')
    {
      if(this.chosenArray[inder] != undefined)
      {
        this.cardsArray[inder][(10 + this.chosenArray[inder].index - 1) % 10].state = 'in';
        this.chosenArray[inder] = this.cardsArray[inder][(10 + this.chosenArray[inder].index - 1) % 10];
      }
      else
      {
        this.cardsArray[inder][0].state = 'in';
        this.chosenArray[inder] = this.cardsArray[inder][0];
      }
    }
    console.log('inder : ' + inder);
    console.log('my chosen card : ' + JSON.stringify(this.chosenArray));
  }

  get4RandomNumbers() {
    if(this.duringChosing == 0)
    {
      var arr = []
      while(arr.length < 4){
          var randomnumber = Math.floor(Math.random()*9) + 1;
          if(arr.indexOf(randomnumber) > -1) continue;
          arr[arr.length] = randomnumber;
      }
      console.log('rand numbers : ' + JSON.stringify(arr));
      this.finalLength = 0;
      this.duringChosing = 1;// progressing...
      for(let i=0; i<arr.length; i++)
      {
        this.chosenArray[i] = this.cardsArray[i][arr[i]];
        this.myanimateSpin(i, arr[i]);
      }
    }
  }

  myanimateSpin(inx , itemIndex) {
    this.cardsArray[inx].forEach(card => card.state = 'out');
    this.currentIndex[inx] = 0;
    this.cardsArray[inx][this.currentIndex[inx]].state = 'in';

    this.intervalInstance[inx] = setInterval(() => {
      this.currentIndex[inx]++;
      if (this.currentIndex[inx] === this.cardsArray[inx].length) {
        this.currentIndex[inx] = 0;
      }
      if (this.currentIndex[inx] !== 0 ) {
        this.cardsArray[inx][this.currentIndex[inx] - 1].state = 'out';
      } else {
        this.cardsArray[inx][this.cardsArray[inx].length - 1].state = 'out';
      }
      this.cardsArray[inx][this.currentIndex[inx]].state = 'in';
    }, 100);

    console.log(inx);

    setTimeout(() => {
      clearInterval(this.intervalInstance[inx]);
      const randomCard = this.cardsArray[inx].filter(card => card.state === 'in');
      console.log(randomCard);
      this.finalLength += 1;
      if(this.finalLength == 4)
      {
        this.duringChosing = 0; // done;
        console.log('end~~~ : ' + JSON.stringify(this.chosenArray));
      }
    }, itemIndex * 100);
  }
  
  resetChosenCards() {
    this.chosenArray = [];
    for(let i = 0; i < this.cardsArray.length; i++)
    {
      this.cardsArray[i].forEach(card => card.state = 'out');
    }
  }

  setTabInfo(tabindex) {
    this.tabIndex = tabindex;

    switch(this.tabIndex) {
      case 0:
        this.router.navigate(['/loto/demo-play-buyticket']);
        break;
      case 1:
        this.router.navigate(['/loto/demo-play-rules']);
        break;
      case 2:
        this.router.navigate(['/loto/demo-play-archive']);
        break;
    }
  }

}
