import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';


@Injectable()
export class Socket {
  socket: any;
  constructor() {
    const socketUrl = 'https://you360.herokuapp.com';
    // const socketUrl = 'http://localhost:3000';
    this.socket = io.connect(socketUrl);
  }

  // Get items observable
  get(): Observable<any> {
    this.socket.on('connect', () => this.connect());
    this.socket.on('disconnect', () => this.disconnect());
    this.socket.on('error', (error: string) => {
      console.log(`ERROR: "${error}"`);
    });

    // Return observable which follows "notification" and "order checkout" signals from socket stream
    return new Observable((observer: any) => {
      this.socket.on('new video', (video: any) => observer.next({type: 'video', data: video}) );
      // return () => this.socket.close();
    });
  }

  newVideo(id: any) {
    this.socket.emit('new video created', id);
  }


  // Handle connection opening
  private connect() {
    console.log(`Connected to https://you360.herokuapp.com`);

    // Request initial list when connected
    // this.socket.emit('login', this.appService.user);
  }

  // Handle connection closing
  private disconnect() {
    console.log(`Disconnected from https://you360.herokuapp.com`);
    // this.socket.emit('logout', this.appService.user);
  }
}
