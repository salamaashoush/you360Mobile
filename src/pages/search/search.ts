import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';
import {Video} from "../../providers/video";



@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentVideos: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public video: Video) { }

  /**
   * Perform a service for the proper items.
   */
  getVideos(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentVideos = [];
      return;
    }
    this.video.search(val).subscribe((res)=>{
      this.currentVideos = res.json();
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openVideo(video) {
    this.navCtrl.push(ItemDetailPage, {
      video: this.video
    });
  }

}
