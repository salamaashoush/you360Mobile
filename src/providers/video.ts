import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';

/**
 * Video Api providers give the app ability to all rest api operations for videos
 */
@Injectable()
export class Video {
  constructor(public http: Http, public api: Api) {
  }
  /**
   * Send a GET request to videos endpoint to get all videos from api
   */
  all() {
    let seq = this.api.get('videos').share();
    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  /**
   * Send a GET request to videos endpoint to get specific video from api
   */
  get(videoId: any) {
    let seq = this.api.get(`videos/${videoId}`).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }
  /**
   * Send a POST request to videos endpoint to create new video
   */
  create(video){
    let seq = this.api.post(`videos`,video).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });
    return seq;
  }
  /**
   * Send a PUT request to videos endpoint to update specific video data
   */
  update(videoId,data){
    let seq = this.api.put(`videos/${videoId}`,data).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });
    return seq;
  }
  /**
   * Send a DELETE request to videos endpoint to delete specific video
   */
  delete(videoId){
    let seq = this.api.delete(`videos/${videoId}`).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });
    return seq;
  }
  /**
   * Send a POST request to videos endpoint to make current user like  specific video
   */
  like(videoId){
    let seq = this.api.post(`videos/${videoId}/like`,{}).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });
    return seq;
  }
  /**
   * Send a POST request to videos endpoint to make current user dislike  specific video
   */
  dislike(videoId){
    let seq = this.api.post(`videos/${videoId}/dislike`,{}).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });
    return seq;
  }
  /**
   * Send a POST request to videos endpoint to make current user comment on  specific video
   */
  comment(videoId,comment){
    let seq = this.api.post(`videos/${videoId}/comments`,comment).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });
    return seq;
  }
  /**
   * Send a GET request to search for videos that have q param value in its data
   */
  search(q){
    let seq = this.api.get(`search?q=${q}`).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });
    return seq;
  }
  /**
   * Send a GET request to get videos with the same tags
   */
  similar(videoId) {
    let seq = this.api.get(`videos/${videoId}/similar`).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });
    return seq;
  }
}

