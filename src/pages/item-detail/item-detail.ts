import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Socket} from "../../providers/socket";

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  views: any;
  likes: any;
  dislikes: any;
  comments:any;
  video: any;
  likeIcon:any;
  dislikeIcon:any;
  constructor(public navCtrl: NavController, navParams: NavParams,public socket:Socket,public alertCtrl: AlertController) {
    this.video = navParams.get('video');
    this.likes=this.video.likes.length;
    this.dislikes=this.video.dislikes.length;
    this.comments=this.video.comments;
    this.views=this.video.views;
    this.likeIcon=this.video.liked?"thumbs-up":"thumbs-up-outline"
    this.dislikeIcon=this.video.disliked?"thumbs-down":"thumbs-down-outline"
    this.socket.viewVideo(this.video._id);
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
    socket.listen(`${this.video._id}_comments`).subscribe((data)=>{
     this.comments=data;
    })
    socket.listen(`${this.video._id}_views`).subscribe((data)=>{
      this.views=data;
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
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Add Comment',
      inputs: [
        {
          name: 'comment',
          placeholder: 'You comment'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log("cancel");
          }
        },
        {
          text: 'Comment',
          handler: data => {
            this.comment(data.comment);
          }
        }
      ]
    });
    prompt.present();
  }
  comment(comment){
    this.socket.newComment(this.video._id,comment);
  }

}
