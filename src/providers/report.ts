import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';

/**
 * Report Api providers give the app ability to all rest api operations for reports
 */
@Injectable()
export class Report {
  constructor(public http: Http, public api: Api) {
  }
  /**
   * Send a GET request to reports endpoint to get all reports from api
   */
  all() {
    let seq = this.api.get('reports').share();
    seq
      .map(res => res.json())
      .subscribe(res => {

      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  /**
   * Send a GET request to reports endpoint to get specific report from api
   */
  get(reportId: any) {
    let seq = this.api.get(`reports/${reportId}`).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }
  /**
   * Send a POST request to reports endpoint with the data
   * the user entered on the form.
   */
  create(report){
    let seq = this.api.post(`reports`,report).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      });
    return seq;
  }


}
