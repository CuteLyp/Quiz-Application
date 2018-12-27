import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  email;
  password; 
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth : AngularFireAuth) {
  }

  ionViewDidLoad() {
    
  }

  signUp() {
  	this.auth.auth.createUserWithEmailAndPassword(this.email, this.password).then(result => {
  		console.log("create user successfully!");
  		this.navCtrl.push(HomePage);
  	}).catch(error => {
  		console.log("create failed " + error);
  	})
  }
}
