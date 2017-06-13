import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  video: any;
  public src = 'https://you360.herokuapp.com/api/videos/stream';

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.video = navParams.get('video');
  }

}
