import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MainPage } from '../../pages/pages';

import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  /**The account fields for the login form.
   *
   */
  account: { email: string, password: string } = {
    email: 'salamaashoush@gmail.com',
    password: '123456789'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
              public storage: Storage) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  /** Attempt to login in through our User service   when fails show fail toast message*/
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      let res=resp.json();
      this.storage.set('token',res.token);
      this.storage.set('user',res.user)
      this.navCtrl.push(MainPage);
    }, (err) => {
      // this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
