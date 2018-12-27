import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Slides} from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { QuestionProvider } from '../../providers/question/question';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import * as firebase from 'firebase';
import { AnimationService, AnimationBuilder } from 'css-animator';

@IonicPage()
@Component({
  selector: 'page-secondary',
  templateUrl: 'secondary.html',
})
export class SecondaryPage {
  @ViewChild('contentPage') turnPage;
  @ViewChild(Slides) slides: any;

  private animator: AnimationBuilder;

  randomQuestionList : any[] = [];
  randomAnswerArray : any[] = [];
  answerList : any[] = [];
  radioButtons = "none";
  i = 0;
  set;
  marks = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private questionProvider: QuestionProvider, animationServe: AnimationService) {
      this.animator = animationServe.builder();
      questionProvider.secondaryQuestionList$ 
      //.finally(() => this.countTime())
      .first()
      .subscribe(
        result => {
          const numberArray = questionProvider.randomNumber(result.length, 10);
          for(let x of numberArray) {
            this.randomQuestionList.push(result[x]);
          }
        });
      this.randomAnswerArray = this.questionProvider.randomNumber(4, 4);
    }

  collectAnswer(value) {
    this.radioButtons = value;
  }

  checkAnswer() {
    if(this.randomQuestionList[this.i].answer["answer0"] == this.radioButtons) {
      this.marks++;
    }
    console.log(this.i+1 + ".marks" + this.marks);
  }

  resetButton() {
    this.radioButtons = 'none';
  }

  start(): void {
    this.slides.lockSwipes(false);
    this.slides.slideNext(500);
    this.slides.lockSwipes(true);
    this.countTime();
  }
  
  refreshQuestion() {
    this.checkAnswer();
    if(this.i + 1 < this.randomQuestionList.length) {
      this.animator.setType('zoomOutLeft').show(this.turnPage.nativeElement);
    }
    this.resetButton();
    const delayTime = 500;
    setTimeout(() => {
      if(this.i + 1 < this.randomQuestionList.length) {
        this.i++;
        this.randomAnswerArray = this.questionProvider.randomNumber(4, 4);
        this.countTime();
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
    clearInterval(this.set);
    let second = 15;
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
        //this.collectAnswer();
        clearInterval(this.set);
        this.refreshQuestion();
      }
    }, delayTime);
  }

  ionViewDidLeave() {
    clearInterval(this.set);
  }

  quit() {
    if(confirm("Are you sure leave this quiz?")) {
      clearInterval(this.set);
      this.navCtrl.push(HomePage);  
    }
  }

  tryAgain() {
    this.navCtrl.setRoot(SecondaryPage);
  }

  goToHomepage() {
    this.navCtrl.setRoot(HomePage);
  }

}
