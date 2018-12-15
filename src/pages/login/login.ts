import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../../pages/register/register';
import { PrivatePage } from '../../pages/private/private';
import { User } from '../../models/user/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from '../../services/authentication.service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  isAuthenticated : boolean = false;
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ourAuth: AuthenticationService, 
  	private afAuth: AngularFireAuth) {
  	this.isAuthenticated = this.ourAuth.checkAuthStatus();
  }

  login(userToLogin: User) {
    console.log("login page");
    this.ourAuth.loginService(userToLogin);
    this.afAuth.authState.subscribe(result => {
      if(result && result.email && result.uid) {
        this.navCtrl.setRoot(PrivatePage);
        console.log("login successful");
      } else {
        console.log("login failed");
      }
    })
  }
  
  goToHomepage() {
  	this.navCtrl.setRoot(HomePage);
  }
  
  goToRegisterpage() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
