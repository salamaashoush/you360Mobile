import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';
import "rxjs/add/operator/mergeMap";
import {Storage} from "@ionic/storage";
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://jrogjrhbce.localtunnel.me/api';

  constructor(public http: Http,public storage:Storage,private transfer: Transfer, private file: File) {
  }

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
      alert(JSON.stringify(options));
      return Observable.fromPromise(fileTransfer.upload(path, this.url+'/videos/upload', options,true));
    });
  }
}
