import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class Category {

  constructor(public http: Http, public api: Api) {
  }
  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  all() {
    let seq = this.api.get('categories').share();
    seq.map(res => res.json())
    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  get(catId: any) {
    let seq = this.api.get(`categories/${catId}`).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }
  create(video){
    let seq = this.api.post(`categories`,video).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
      }, err => {
        console.error('ERROR', err);
      });
    return seq;
  }

}
