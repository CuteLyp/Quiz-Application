import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { User } from '../models/user/user';

@Injectable()
export class AuthenticationService {

	isAuthenticated: any = null;

	constructor(public afAuth: AngularFireAuth) {

	}
	async loginService(userTologin: User) {
		try {
			const result = this.afAuth.auth.signInWithEmailAndPassword(userTologin.email, userTologin.password);
			//console.log(result);
			return result;
		} catch(e) {
			console.error(e);
		}
	}

	async registerService(userToRegister: User) {
		try {
			const result = await this.afAuth.auth.createUserWithEmailAndPassword(userToRegister.email, userToRegister.password);
			//console.log(result);
		} catch (e) {
			console.error(e);
		}
	}

	checkAuthStatus() {
		this.afAuth.auth.onAuthStateChanged(status => {
			if(status) {
				this.isAuthenticated = true;
			} else {
				this.isAuthenticated = false;
			}
		});
		return this.isAuthenticated;
	}

	logoutService() {
		this.afAuth.auth.signOut();
	}
}