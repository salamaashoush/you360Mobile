import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';

/**
 * Category api provider
 */
@Injectable()
export class Category {

  constructor(public http: Http, public api: Api) {
  }
  /**
   * Send a GET request to categories endpoint to get all categories from api
   */
  all() {
    let seq = this.api.get('categories').share();
    seq.map(res => res.json())
    return seq;
  }

  /**
   * Send a GET request to categories endpoint to get specific category from api
   */
  get(catId: any) {
    let seq = this.api.get(`categories/${catId}`).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

}
