import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';
import {Storage} from "@ionic/storage";

/**
 * socket provider a wrapper for all socket event in the app
 * you cant inject the socket provider in any page or component or provider
 * ```typescript
 * class Component {
 *  constructor( public socket: Socket){
 *    this.socket.listen('event name').subscribe((data)=>{
 *      console.log(data);
 *    });
 *  }
 *  method(){
 *    this.socket.socketEventMethod();
 *  }
 * }
 * ```
 */
@Injectable()
export class Socket {
  socket: any;
  _user:any;
  /**
   * initialize socket serverUrl variable and connect to the socket io server
   */
  constructor(public storage:Storage) {
    // const socketUrl = 'https://you360.herokuapp.com';

    const socketUrl = 'http://localhost:3000';
    this.socket = io.connect(socketUrl);
    this.storage.get('user').then((user)=>{this._user=user});
  }

  /**
   * listen method takes event name and connect to the socket server then start listen to the event when it occurs it will return an Observable
   * ```typescript
   * this.socket.listen('new video').subscribe((data)=>{
   *  console.log(data);
   * });
   * ```
   */
  listen(event): Observable<any> {
    this.socket.on('connect', () => this.connect());
    this.socket.on('disconnect', () => this.disconnect());
    this.socket.on('error', (error: string) => {
      console.log(`ERROR: "${error}"`);
    });
    return new Observable((observer: any) => {
      this.socket.on(event, (data: any) => observer.next(data) );
      // return () => this.socket.close();
    });
  }
  /**
   *  emit 'new video created' socket event
   * ```typescript
   * this.socket.newVideo('54545a4dsad54545545')
   * ```
   */
  newVideo(id: any) {
    this.socket.emit('new video created', id);
  }
  /**
   *  emit 'like video' socket event
   * ```typescript
   * this.socket.likeVideo('54545a4dsad54545545')
   * ```
   */
  likeVideo(id: any) {
    this.socket.emit('like video', {videoId:id,userId:this._user._id});
  }
  /**
   *  emit 'dislike video' socket event
   * ```typescript
   * this.socket.dislikeVideo('54545a4dsad54545545')
   * ```
   */
  dislikeVideo(id: any) {
    this.socket.emit('dislike video', {videoId:id,userId:this._user._id});
  }
  /**
   *  emit 'new comment' socket event
   * ```typescript
   * this.socket.newComment('54545a4dsad54545545','this a good video')
   * ```
   */
  newComment(videoId,comment) {
    this.socket.emit('new comment', {videoId:videoId,comment:{uid:this._user,comment:comment}});
  }
  /**
   *  emit 'view video' socket event
   * ```typescript
   * this.socket.viewVideo('54545a4dsad54545545')
   * ```
   */
  viewVideo(videoId){
    this.socket.emit('view video', {videoId:videoId});
  }


  /** Handle connection opening and emit 'login' socket event*/
  private connect() {
    console.log(`Connected to socket`);
    this.socket.emit('login', this._user);
  }

  /** Handle connection closing*/
  private disconnect() {
    console.log(`Disconnected from https://you360.herokuapp.com`);
    // this.socket.emit('logout', this.appService.user);
  }
}
