import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LoginPage } from '../../pages/login/login';
import { PrimaryPage } from '../../pages/primary/primary';
import { SecondaryPage } from '../../pages/secondary/secondary';
import { HighPage } from '../../pages/high/high';
import { AnimationService, AnimationBuilder } from 'css-animator';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from '../../services/authentication.service';
import { PrivatePage } from '../../pages/private/private';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
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
export class HomePage {
  visibleState = 'visible';
  @ViewChild('myElement') myElem;

  login = "1";
  logout = "2";
  path = "none";

  private animator: AnimationBuilder;

  isAuthenticated: boolean = false;

  constructor(public navCtrl: NavController, animationServe: AnimationService, private afAuth: AngularFireAuth,
    public ourAuth: AuthenticationService) {
    this.animator = animationServe.builder();
    this.isAuthenticated = this.ourAuth.checkAuthStatus();
    //let test = navParam.get()
  }

  ionViewDidLoad() {
    if(this.ourAuth.checkAuthStatus()) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  goToLoginpage() {
    this.navCtrl.push(LoginPage);
  }

  signOut() {
    this.isAuthenticated = false;
    this.ourAuth.logoutService();
    this.navCtrl.setRoot(HomePage);
  }

  goToPrimarypage() {
    this.navCtrl.setRoot(PrimaryPage);
  }

  goToSecondarypage() {
    this.navCtrl.setRoot(SecondaryPage);
  }

  goToHighpage() {
    this.navCtrl.setRoot(HighPage);
  }

  toggleVisible() {
  	this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
  }

  animateElem() {
    this.animator.setType('bounceOutLeft').show(this.myElem.nativeElement);
  }

  getPath(value) {
    this.path = value;
    console.log(value);
  }
}
