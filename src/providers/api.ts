import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';
import "rxjs/add/operator/mergeMap";
import {Storage} from "@ionic/storage";
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';


/**
 * Api is a generic REST Api handler. Set your API url first.
 * this providers also sets authentications header before every request
 */
@Injectable()
export class Api {
  url: string = 'https://you360.herokuapp.com/api';
  // url: string = 'https://pushzfuyzc.localtunnel.me/api';
  constructor(public http: Http,public storage:Storage,private transfer: Transfer) {
  }
  /**
   * send GET Request to specific endpoint
   */
  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }
    let storageObservable = Observable.fromPromise(this.storage.get('token'));
    return storageObservable.flatMap(token => {
      if (token) {
        options.headers=new Headers();
        options.headers.set('Authorization', token);
      }
      // the value that will be returned
      return this.http.get(this.url + '/' + endpoint, options);
    });
  }
  /**
   * send POST Request to specific endpoint with the data
   */
  post(endpoint: string, body: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    let storageObservable = Observable.fromPromise(this.storage.get('token'));
    return storageObservable.flatMap(token => {
      if (token) {
        options.headers=new Headers();
        options.headers.set('Authorization', token);
      }
      // the value that will be returned
      return this.http.post(this.url + '/' + endpoint, body, options);
    });

  }
  /**
   * send PUT Request to specific endpoint with the data
   */
  put(endpoint: string, body: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    let storageObservable = Observable.fromPromise(this.storage.get('token'));
    return storageObservable.flatMap(token => {
      if (token) {
        options.headers=new Headers();
        options.headers.set('Authorization', token);
      }
      // the value that will be returned
      return this.http.put(this.url + '/' + endpoint, body, options);
    });
  }
  /**
   * send DELETE Request to specific endpoint
   */
  delete(endpoint: string, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    let storageObservable = Observable.fromPromise(this.storage.get('token'));
    return storageObservable.flatMap(token => {
      if (token) {
        options.headers=new Headers();
        options.headers.set('Authorization', token);
      }
      // the value that will be returned
      return this.http.delete(this.url + '/' + endpoint, options);
    });

  }
  /**
   * send PATCH Request to specific endpoint with the data
   */
  patch(endpoint: string, body: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    let storageObservable = Observable.fromPromise(this.storage.get('token'));
    return storageObservable.flatMap(token => {
      if (token) {
        options.headers=new Headers();
        options.headers.set('Authorization', token);
      }
      // the value that will be returned
      return this.http.put(this.url + '/' + endpoint, body, options);
    });
  }
  /**
   * handles file uploads to specific path
   */
  upload(path,uploadOptions) {
    const fileTransfer: TransferObject = this.transfer.create();
    let options: FileUploadOptions = uploadOptions
    let storageObservable = Observable.fromPromise(this.storage.get('token'));
    return storageObservable.flatMap(token => {
      if (token) {
        options.headers={
          'Authorization': token
        };
      }
      // the value that will be returned
      return Observable.fromPromise(fileTransfer.upload(path, this.url+'/videos/upload', options,true));
    });
  }
}
