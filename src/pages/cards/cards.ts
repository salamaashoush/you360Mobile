import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {ItemDetailPage} from "../item-detail/item-detail";

import {Video} from "../../providers/video";
import {Socket} from "../../providers/socket";
import {Storage} from "@ionic/storage";
import {ListMasterPage} from "../list-master/list-master";
import {MapPage} from "../map/map";

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  videos:any=[];
  user:any;
  constructor(public navCtrl: NavController, public video: Video, public modalCtrl: ModalController,public socket:Socket,public storage:Storage) {
    // this.video.all().subscribe((data)=>{
    //   this.videos = data.json().docs;
    //   console.log(this.videos);
    // });
    this.storage.get('user').then((user)=>{
      this.user=user;
    })

  }

  /**
   * The view loaded, let's query our videos for the list
   */
  ionViewDidEnter(){
    this.video.all().subscribe((data)=>{
      this.videos = data.json().docs;
    });
  }
  ionViewDidLoad() {


  }


  /**
   * Navigate to the detail page for this video.
   */
  openVideo(video) {
    this.navCtrl.push(ItemDetailPage, {
      video
    });
  }
  /**
   * Navigate to the list view page
   */
  showList(){
    this.navCtrl.setRoot(ListMasterPage);
  }
  /**
   * Navigate to the list map page
   */
  showMap(){
    this.navCtrl.setRoot(MapPage);
  }
}
