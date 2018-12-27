import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Question, DiagramQuestion } from '../../models/question/question';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class QuestionProvider {

  ref;

  primaryQuestionList$ : Observable<Question[]>;
  primaryGeographyQuestionList$ : Observable<Question[]>;
  secondaryQuestionList$ : Observable<Question[]>;
  highQuestionList$ : Observable<DiagramQuestion[]>;

  answerList: any[] = new Array();

  private primaryQuestionListRef = this.db.list<Question>
  ('/All/Primary/QuestionList', ref => ref.orderByChild('question'));

  private primaryGeographyQuestionListRef = this.db.list<Question>
  ('/All/Secondary/Geography', ref => ref.orderByChild('question'));

  private secondaryQuestionListRef = this.db.list<Question>
  ('/All/Secondary/QuestionList', ref => ref.orderByChild('question'));

  private highQuetionListRef = this.db.list<DiagramQuestion>
  ('/All/Secondary/Computer', ref => ref.orderByChild('question'));

  /*
    private highQuestionTestRef = this.db.list<DiagramQuestion>
  ('/All/Secondary/' + this.ref , ref => ref.orderByChild('question'));
  */


  constructor(private db: AngularFireDatabase, ) {
    this.primaryQuestionList$ = this.getPrimaryQuestionList().snapshotChanges().pipe(map(changes =>
      changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    ));

    this.primaryGeographyQuestionList$ = this.getPrimaryGeographyQuestionList().snapshotChanges().pipe(map(changes =>
      changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    ));
    
    this.highQuestionList$ = this.getHighDiagramQuestionList().snapshotChanges().pipe(map(changes => 
      changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
     ));

    this.secondaryQuestionList$ = this.getSecondaryQuestionList().snapshotChanges().pipe(map(changes =>
      changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    ));
  }

  getRandomQuestions() {
    var array = this.randomNumber(10, 5);
    return array;
  }

  //Questions

  //primary
  getPrimaryQuestionList() {
  	return this.primaryQuestionListRef;
  }
  getPrimaryGeographyQuestionList() {
    return this.primaryGeographyQuestionListRef;
  }
  addPrimaryQuestion(dataQuestion: Question) {
    return this.primaryQuestionListRef.push(dataQuestion);
  }
  updatePrimaryQuestion(dataQuestion: Question) {
    return this.primaryQuestionListRef.update(dataQuestion.key, dataQuestion);
  }
  removePrimaryQuestion(dataQuestion: Question) {
    return this.primaryQuestionListRef.remove(dataQuestion.key);
  }

  //secondary
  getSecondaryQuestionList() {
    return this.secondaryQuestionListRef;
  }
  addSecondaryQuestionList(dataQuestion: Question) {
    return this.secondaryQuestionListRef.push(dataQuestion);
  }
  upSecondaryQuestionList(dataQuestion: Question) {
    return this.secondaryQuestionListRef.update(dataQuestion.key, dataQuestion);
  }
  removeSecondaryQuestionList(dataQuestion: Question) {
    return this.secondaryQuestionListRef.remove(dataQuestion.key);
  }

  //high diagram question
  getHighDiagramQuestionList() {
    return this.highQuetionListRef;
  }


  collectAnswer(QuestionObj) {
  	this.answerList.push(QuestionObj);
  }
  checkAnswer() {
    return this.answerList;
  }

  //
  randomNumber(range, numbers) {
    if(numbers > range) {
      
    }
    var map = new Map();
    var result = [];
    for(var i = 0; i < numbers; i++) {
      var randomNum = 0 | Math.random() * range;
      if(!map.has(randomNum)) {
        map.set(randomNum, randomNum);
        result[i] = randomNum;
      } else {
        while(map.has(randomNum)) {
          randomNum = 0 | Math.random() * range;
        }
        map.set(randomNum, randomNum);
        result[i] = randomNum;  
      }
    }
    return result;
  }

  countTime(time) {
  	var timeNode = document.getElementById("timeNode");
  	var set = setInterval(function () {
  	  time--;
  	  timeNode.innerHTML = time;
      if(time == 0) {
      	timeNode.innerHTML = "";
      	clearInterval(set);
  	  }
  	}, 1000);
  }

}
