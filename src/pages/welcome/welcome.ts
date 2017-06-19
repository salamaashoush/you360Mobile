import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import {Storage} from "@ionic/storage";
import {FirstRunPage, MainPage} from "../pages";
import {Api} from "../../providers/api";

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {

  }
  /**
   * change the view to show login page using navigation controller
   */
  login() {
    this.navCtrl.push(LoginPage);
  }
  /**
   * change the view to show register page using navigation controller
   */
  signup() {
    this.navCtrl.push(SignupPage);
  }
}
