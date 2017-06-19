import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Socket} from "../../providers/socket";
import {Video} from "../../providers/video";
import {Report} from "../../providers/report";

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
  choice: string = 'comments';
  similar: Array<any>;
  constructor(public navCtrl: NavController, navParams: NavParams,public socket:Socket,public alertCtrl: AlertController,public videoProvider:Video,public reportProvider:Report,public toastCtrl: ToastController) {
    this.video = navParams.get('video');
    this.likes=this.video.likes.length;
    this.dislikes=this.video.dislikes.length;
    this.comments=this.video.comments;
    this.views=this.video.views;
    this.likeIcon=this.video.liked?"thumbs-up":"ios-thumbs-up-outline";
    this.dislikeIcon=this.video.disliked?"thumbs-down":"ios-thumbs-down-outline";
    this.socket.viewVideo(this.video._id);
    socket.listen(`${this.video._id}_likes`).subscribe((data)=>{
      this.dislikes=data.dislikes
      this.likes=data.likes
      console.log(data);
    });
    socket.listen(`${this.video._id}_dislikes`).subscribe((data)=>{
      this.dislikes=data.dislikes
      this.likes=data.likes
      console.log(data);
    });
    socket.listen(`${this.video._id}_comments`).subscribe((data)=>{
     this.comments=data;
    });
    socket.listen(`${this.video._id}_views`).subscribe((data)=>{
      this.views=data;
      console.log(data);
    });
    this.getSimilar();
  }
  /**
   handles like action and call like socket event
   */
  like(){
    console.log("like");
    this.likeIcon="thumbs-up";
    this.dislikeIcon="thumbs-down-outline"
    this.video.liked=true;
    this.video.disliked=false;
    this.video.liked=true;
    this.socket.likeVideo(this.video._id);

  }
  /**
  handles dislike action and call dislike socket event
  */
  dislike(){
    console.log("dislike");
    this.likeIcon="thumbs-up-outline";
    this.dislikeIcon="thumbs-down"
    this.video.liked=false;
    this.video.disliked=true;
    this.video.liked=false;
    this.socket.dislikeVideo(this.video._id);
    console.log(`${this.video._id}_dislikes`);
  }
  /**
  builds a prompt for the comment and show it for the user
  */
  showComment() {
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
  /**
  builds a prompt for the report and show it for the user
  */
  showReport() {
    let prompt = this.alertCtrl.create({
      title: 'Report this Video',
      inputs: [
        {
          name: 'name',
          placeholder: 'Your Name'
        },
        {
          name: 'email',
          placeholder: 'Your Email'
        },
        {
          name: 'description',
          placeholder: 'Give us more details'
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
          text: 'Report',
          handler: data => {
            this.report(data);
          }
        }
      ]
    });
    prompt.present();
  }
  /**
  calls the comment socket event with the data from comment prompt
  */
  comment(comment){
    this.socket.newComment(this.video._id,comment);
  }
  /**
 calls the report create api endpoint with the data from report prompt
 */
  report(data){
    data.video = this.video._id;
    this.reportProvider.create(data).subscribe((res)=>{
      let toast = this.toastCtrl.create({
        message: res.json().message,
        duration: 3000
      });
      toast.present();
    })
  }
  /**
get similar video from the server
*/
  getSimilar() {
    this.videoProvider.similar(this.video._id).subscribe((res)=>{
      this.similar = res.json().docs;
    })
  }

}
