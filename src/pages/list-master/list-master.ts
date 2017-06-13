import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';
import {Video} from "../../providers/video";
import {Socket} from "../../providers/socket";
import {Storage} from "@ionic/storage";

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
   * The view loaded, let's query our items for the list
   */
  ionViewDidEnter(){
    this.video.all().subscribe((data)=>{
      this.videos = data.json().docs;
    });
  }
  ionViewDidLoad() {


  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addVideo() {
    this.navCtrl.push(ItemCreatePage);
  }

  /**
   * Delete an item from the list of items.
   */
  deleteVideo(video) {
    this.video.delete(video.id).subscribe((response)=>{
      this.videos = this.videos.filter((v)=>{
        return v.id !== video.id;
      })
    })

  }

  /**
   * Navigate to the detail page for this item.
   */
  openVideo(video) {
    this.navCtrl.push(ItemDetailPage, {
      video
    });
  }
}
