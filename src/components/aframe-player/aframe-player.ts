import { Component } from '@angular/core';

/**
 * Generated class for the AframePlayerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'aframe-player',
  templateUrl: 'aframe-player.html'
})
export class AframePlayerComponent {

  text: string;

  constructor() {
    console.log('Hello AframePlayerComponent Component');
    this.text = 'Hello World';
  }

}
