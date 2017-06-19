import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemCreatePage } from '../item-create/item-create';
import { MapPage } from '../map/map';
import { ItemDetailPage } from '../item-detail/item-detail';
import {Video} from "../../providers/video";
import {Socket} from "../../providers/socket";
import {Storage} from "@ionic/storage";
import {CardsPage} from "../cards/cards";

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
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
   * Navigate to the video create page
   */
  addVideo() {
    this.navCtrl.push(ItemCreatePage);
  }

  /**
   * Delete an video from the list of videos.
   */
  deleteVideo(video) {
    this.video.delete(video.id).subscribe((response)=>{
      this.videos = this.videos.filter((v)=>{
        return v.id !== video.id;
      })
    })

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
   * Navigate to the map view page
   */
  showMap(){
    this.navCtrl.setRoot(MapPage);
  }
  /**
   * Navigate to the card view page
   */
  showCard(){
    this.navCtrl.setRoot(CardsPage);
  }
}
