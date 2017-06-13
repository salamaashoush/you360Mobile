import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Video} from "../../providers/video";
import {Socket} from "../../providers/socket";

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  likes: any;
  dislikes: any;
  video: any;
  likeIcon:any;
  dislikeIcon:any;
  constructor(public navCtrl: NavController, navParams: NavParams,public videoProvider:Video,public socket:Socket) {
    this.video = navParams.get('video');
    this.likes=this.video.likes.length;
    this.dislikes=this.video.dislikes.length;
    this.likeIcon=this.video.liked?"thumbs-up":"thumbs-up-outline"
    this.dislikeIcon=this.video.disliked?"thumbs-down":"thumbs-down-outline"
    socket.listen(`${this.video._id}_likes`).subscribe((data)=>{
      this.dislikes=data.dislikes
      this.likes=data.likes
      console.log(data);
    })
    socket.listen(`${this.video._id}_dislikes`).subscribe((data)=>{
      this.dislikes=data.dislikes
      this.likes=data.likes
      console.log(data);
    })
  }
  like(){
    console.log("like");
    this.likeIcon="thumbs-up";
    this.dislikeIcon="thumbs-down-outline"
    this.video.liked=true;
    this.video.disliked=false;
    this.socket.likeVideo(this.video._id);

  }
  dislike(){
    console.log("dislike");
    this.likeIcon="thumbs-up-outline";
    this.dislikeIcon="thumbs-down"
    this.video.liked=false;
    this.video.disliked=true;
    this.socket.dislikeVideo(this.video._id);
    console.log(`${this.video._id}_dislikes`);
  }
  comment(){
    console.log("comment");
  }

}
