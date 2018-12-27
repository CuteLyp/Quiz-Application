import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Slides } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { QuestionProvider } from '../../providers/question/question';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import * as firebase from 'firebase';


/**
 * Generated class for the HighPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-high',
  templateUrl: 'high.html',
})
export class HighPage {
  @ViewChild(Slides) slides: any;

  ngOnInit() {
    //this.slides.lockSwipes(true);
  }

  randomQuestionList : any[] = [];
  randomAnswerArray : any[] = [];
  answerList : any[] = [];
  radioButtons = "none";
  i = 0;
  set;
  marks = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private questionProvider: QuestionProvider) {
      questionProvider.highQuestionList$
      //.finally(() => this.countTime())
      .first()
      .subscribe(
        result => {
          const numberArray = questionProvider.randomNumber(result.length, 2);
          for(let x of numberArray) {
            this.randomQuestionList.push(result[x]);
          }
        });
      this.randomAnswerArray = this.questionProvider.randomNumber(4, 4);
    }

  ionViewDidLeave() {
    clearInterval(this.set);
  }

  showNext(): void {
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
    }
    console.log(this.i+1 + ".marks" + this.marks);
  }

  resetButton() {
    this.radioButtons = 'none';
  }

  refreshQuestion() {
    let delayTime = 2000;
    this.checkAnswer();
    this.i++;
    setTimeout(() => {
      this.showNext();
      this.randomAnswerArray = this.questionProvider.randomNumber(4, 4);
      this.slides.slideNext(500, true);
      //this.countTime();
    }, delayTime)
  }

  countTime() {
    clearInterval(this.set);
    let second = 4;
    const delayTime = 1000;
    this.set = setInterval(() => {
      const timeNode = document.getElementById("timeNode");
      //console.log(timeNode);
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
        if(this.i !== this.randomQuestionList.length) {
          this.refreshQuestion();
        }
      }
    }, delayTime);
  }

  quit() {
    if(confirm("Are you sure leave this quiz?")) {
      clearInterval(this.set);
      this.navCtrl.push(HomePage);  
    }
  }

  goToHomepage() {
    this.navCtrl.push(HomePage);
  }

  tryAgain() {
    this.navCtrl.push(HighPage);
  }
}