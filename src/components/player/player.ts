declare var videojs:any;
import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

/**
 * Generated class for the PlayerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'player',
  templateUrl: 'player.html'
})
export class PlayerComponent implements AfterViewInit,OnDestroy,OnInit{

  @Input('src') src: any;
  @ViewChild('player') _player: ElementRef;
  private videoJSplayer: any;

  constructor(player: ElementRef) {
    this._player = player;
  }

  ngOnInit() {

  }
  ngAfterViewInit(){
    const options = {
      plugins: {
        panorama: {
          clickAndDrag: true,
          clickToToggle: true,
          autoMobileOrientation: true
        }
      }
    };
    this.videoJSplayer = videojs(this._player.nativeElement, options, function () {
      // This is functionally the same as the previous example.
    });
  }

  ngOnDestroy() {
    this.videoJSplayer.dispose();
  }

}
