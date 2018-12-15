import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthenticationService } from '../services/authentication.service';  
import { firebase_environment } from '../environment/environment';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PrimaryPage } from '../pages/primary/primary';
import { SecondaryPage } from '../pages/secondary/secondary';
import { HighPage } from '../pages/high/high';
import { ResultPage } from '../pages/result/result';
import { PrivatePage } from '../pages/private/private';
import { QuestionProvider } from '../providers/question/question';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationService, AnimatesDirective } from 'css-animator';
import { FlashCardComponent } from '../components/flash-card/flash-card';

@NgModule({
  declarations: [
    MyApp,
    HomePage,LoginPage,RegisterPage,PrimaryPage,SecondaryPage,HighPage,ResultPage,PrivatePage,
    AnimatesDirective,FlashCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase_environment),
    AngularFireAuthModule,AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,LoginPage,RegisterPage,PrimaryPage,SecondaryPage,HighPage,ResultPage,PrivatePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QuestionProvider,AnimationService,AuthenticationService,
  ]
})
export class AppModule {}
