import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage";
import {User} from "../../providers/user";

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  user:any = {}
  constructor(public navCtrl: NavController, public translate: TranslateService,public storage:Storage,public userProvider: User,
              public toastCtrl: ToastController ) {
    this.storage.get('user').then((user)=>{
      this.user = {firsName:user.firsName,lastName:user.lastName,email:user.email,password:user.password,_id:user._id};
    })
  }


  doUpdate(){
    this.userProvider.update(this.user._id,this.user).subscribe((res) => {
      let toast = this.toastCtrl.create({
        message: res.json().message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
