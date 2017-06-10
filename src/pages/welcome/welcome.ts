import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import {Storage} from "@ionic/storage";
import {FirstRunPage, MainPage} from "../pages";

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController,private storage:Storage) {

  }
  ionViewDidLoad() {
    this.checkFirstRun();
    this.checkUser();
  }
  checkUser(){
    this.storage.get('user').then((user)=>{
      if(user){
        this.navCtrl.push(MainPage);
      }
    })
  }
  checkFirstRun(){
    this.storage.get('introShown').then((result)=>{
      if(!result){
        this.navCtrl.push(FirstRunPage);
        this.storage.set('introShown',true);
      }
    });
  }
  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
