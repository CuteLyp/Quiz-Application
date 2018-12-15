import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { Observable } from 'rxjs';
import { Question } from '../../models/question/question';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from '../../services/authentication.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

/**
 * Generated class for the PrivatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-private',
  templateUrl: 'private.html',
})
export class PrivatePage {

  path;
  
  questionList: Observable<Question[]>;
  private questionListRef = this.db.list<Question>
  ('/All/Primary/' + this.path, ref => ref.orderByChild('question'));

  constructor(public navCtrl: NavController, public navParams: NavParams, private Auth: AuthenticationService, 
  	private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
  	  this.questionList = this.getQuestion().snapshotChanges().pipe(map(changes =>
      changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    ));
  }

  getPath(value) {
  	return this.path;
  }

  getQuestion() {
  	return this.questionListRef;
  }

  ionViewWillLoad() {
  	this.getQuestion();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivatePage');
  }


  signOut() {
    console.log("out");
    this.Auth.logoutService();
    console.log("out1");
    this.navCtrl.setRoot(HomePage);
  }
}
