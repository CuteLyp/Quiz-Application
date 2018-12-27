import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams, Content, Slides } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AngularFireDatabase} from 'angularfire2/database';
import { QuestionProvider } from '../../providers/question/question';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import * as firebase from 'firebase';
import { AnimationService, AnimationBuilder } from 'css-animator';


@IonicPage()
@Component({
  selector: 'page-primary',
  templateUrl: 'primary.html',
  animations: [
    trigger('myvisibility', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('* => *', animate('.5s'))
    ])
  ]
})
export class PrimaryPage {
  @ViewChild('contentPage') turnPage;
  @ViewChild(Slides) slides: any;

  visibleState = 'invisible';
  
  private animator: AnimationBuilder;
  
  //questions list
  randomQuestionList : any[] = [];
  //answers list
  answerArray : any[] = [];
  //random number of answer
  randomAnswerArray : any[] = [];
  //index of question
  i = 0;
  //timer
  set;
  //marks
  marks = 0;
  //radiobuttons value
  radioButtons = "none";
  rightAnswer = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private questionProvider: QuestionProvider, animationServe: AnimationService) {
      this.animator = animationServe.builder();
      questionProvider.primaryQuestionList$
      //.finally(() => this.countTime())
      //.first()
      .subscribe(
        result => {
          //set how many questions here
          const numberArray = questionProvider.randomNumber(result.length, 5);
          for(let x of numberArray) {
            this.randomQuestionList.push(result[x]);
          }
          this.rightAnswer = this.randomQuestionList[this.i].answer["answer0"];
        }
      );
      //this.answerArray.push(this.randomQuestionList[this.i].answer);
      this.randomAnswerArray = this.questionProvider.randomNumber(4, 4);
    }
  /*
  ionViewDidLoad() {
    console.log(document.getElementById("timeNode") + " test1");
  }
  

  ngAfterViewInit() {
    
  }

  ionViewWillLoad() {
    
  }

*/      

  //finished
  start(): void {
    this.slides.lockSwipes(false);
    this.slides.slideNext(500);
    this.slides.lockSwipes(true);
    //this.countTime();
  }

  collectAnswer(value) {
    this.radioButtons = value;
  }

  checkAnswer() {
    if(this.randomQuestionList[this.i].answer["answer0"] == this.radioButtons) {
      this.marks++;
      this.refreshQuestion();
    } else {
      this.visibleState = 'visible';
      setTimeout(() => { 
        this.visibleState = 'invisible';
        this.refreshQuestion();
      }, 2000)
    }
    console.log(this.i+1 + ".marks" + this.marks);
  }

  resetButton() {
    this.radioButtons = 'none';
  }
  
  refreshQuestion() {
    if(this.i + 1 < this.randomQuestionList.length) {
      this.animator.setType('fadeOutLeft').show(this.turnPage.nativeElement);
    }
    this.resetButton();
    const delayTime = 500;
    setTimeout(() => {
      if(this.i + 1 < this.randomQuestionList.length) {
        this.i++;
        this.randomAnswerArray = this.questionProvider.randomNumber(4, 4);
        this.rightAnswer = this.randomQuestionList[this.i].answer["answer0"];
        //this.countTime();
        const timeNode = document.getElementById("timeNode");
        if(this.i + 1 !== this.randomQuestionList.length) {
          timeNode.innerHTML = "Next";
        } else {
          timeNode.innerHTML = "Submit";
        }
      } else if(this.i + 1 === this.randomQuestionList.length) {
        //jump to final result page
        this.slides.lockSwipes(false);
        this.slides.slideNext(500);
        this.slides.lockSwipes(true);
        clearInterval(this.set);
      }
    }, delayTime)
    
  }

  countTime() {
    //clear the last timer
    clearInterval(this.set);
    let second = 5;
    const delayTime = 1000;
    this.set = setInterval(() => {
      const timeNode = document.getElementById("timeNode");
      if(this.i + 1 !== this.randomQuestionList.length) {
        timeNode.innerHTML = "Next";
      } else {
        timeNode.innerHTML = "Submit";
      }
      second--;
      if(second < 11) {
        timeNode.innerHTML = second + "";
      }
      if(second === 0) {
        clearInterval(this.set);
        this.checkAnswer();
      }
    }, delayTime);
  }

  ionViewDidLeave() {
    clearInterval(this.set);
  }

  quit() {
    if(confirm("Are you sure leave this quiz?")) {
      clearInterval(this.set);
      this.navCtrl.setRoot(HomePage);  
    }
  }

  goToHomepage() {
    this.navCtrl.setRoot(HomePage);
  }

  tryAgain() {
    this.navCtrl.setRoot(PrimaryPage);
  }

  toggleVisible() {
    this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
  }
}