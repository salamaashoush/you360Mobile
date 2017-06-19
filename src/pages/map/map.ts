import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import {
  GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import {Video} from "../../providers/video";
import {ItemDetailPage} from "../item-detail/item-detail"
import {CardsPage} from "../cards/cards";
import {ListMasterPage} from "../list-master/list-master";

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') map;
  videos : any[]

  constructor(private googleMaps: GoogleMaps, public navCtrl: NavController, public platform: Platform,public video:Video) {

  }


  ngAfterViewInit() {
    this.video.all().subscribe((res)=>{
      this.videos = res.json().docs;
      this.loadMap();
    });

  }

  /**
   * create a new map by passing HTMLElement
   * then listen to MAP_READY event ```  map.one(GoogleMapsEvent.MAP_READY).then(() => { // your code}) ```
   * You must wait for this event to fire before adding something to the map or modifying it in anyway
   * then filter the videos and loop through it and create new marker in the video location ```  map.addMarker(markerOptions).then(()=>{})```
   * then added click event on the marker to navigate to video details page
   */
  loadMap() {

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      map.getMyLocation().then((loc) => {
        let position: CameraPosition = {
          target: loc.latLng,
          zoom: 15,
          tilt: 30
        };
        // move the map's camera to position
        map.moveCamera(position);
        // create new marker

        this.videos.filter((video)=>{return video.lat && video.long}).forEach((video)=>{
          let latLong = new LatLng(video.lat,video.long);
          let markerOptions: MarkerOptions = {
            position: latLong,
            title: video.name,
            draggable: false,
          };
          map.addMarker(markerOptions)
            .then((marker: Marker) => {
              marker.showInfoWindow();
              marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe((event) => {
                this.navCtrl.push(ItemDetailPage,{video});
              });
            });
        })
      });
    });
  }
  /**
   * Navigate to the list view page
   */
  showList(){
    this.navCtrl.setRoot(ListMasterPage);
  }
  /**
   * Navigate to the card view page
   */
  showCard(){
    this.navCtrl.setRoot(CardsPage);
  }
}
