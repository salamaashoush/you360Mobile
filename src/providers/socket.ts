import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';
import {Storage} from "@ionic/storage";


@Injectable()
export class Socket {
  socket: any;
  _user:any;
  constructor(public storage:Storage) {
    // const socketUrl = 'https://you360.herokuapp.com';
    const socketUrl = 'http://localhost:3000';
    this.socket = io.connect(socketUrl);
    this.storage.get('user').then((user)=>{this._user=user});
  }

  // Get items observable
  listen(event): Observable<any> {
    this.socket.on('connect', () => this.connect());
    this.socket.on('disconnect', () => this.disconnect());
    this.socket.on('error', (error: string) => {
      console.log(`ERROR: "${error}"`);
    });

    // Return observable which follows "notification" and "order checkout" signals from socket stream
    return new Observable((observer: any) => {
      this.socket.on(event, (data: any) => observer.next(data) );
      // return () => this.socket.close();
    });
  }

  newVideo(id: any) {
    this.socket.emit('new video created', id);
  }
  likeVideo(id: any) {
    this.socket.emit('like video', {videoId:id,userId:this._user._id});
  }
  dislikeVideo(id: any) {
    this.socket.emit('dislike video', {videoId:id,userId:this._user._id});
  }

  // Handle connection opening
  private connect() {
    console.log(`Connected to socket`);

    // Request initial list when connected
    // this.socket.emit('login', this.appService.user);
  }

  // Handle connection closing
  private disconnect() {
    console.log(`Disconnected from https://you360.herokuapp.com`);
    // this.socket.emit('logout', this.appService.user);
  }
}
