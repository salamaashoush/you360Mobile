import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {NavController, ViewController} from 'ionic-angular';
import {FileChooser} from '@ionic-native/file-chooser';
import {Camera} from '@ionic-native/camera';
import {Api} from "../../providers/api";
import {Video} from "../../providers/video";
import {Category} from "../../providers/category";
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent, CameraPosition, MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import {Socket} from "../../providers/socket";


@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage implements OnInit, AfterViewInit {
  isUploading: boolean;

  ngOnInit(): void {
    this.category.all().subscribe((data) => {
      this.categories = data.json().docs;
    })
  }

  @ViewChild('fileInput') fileInput;
  @ViewChild('map') map;

  isReadyToSave: boolean;
  videoUrl: any = null;
  item: any;
  categories: any;
  tags: any;
  form: FormGroup;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              formBuilder: FormBuilder,
              public camera: Camera,
              public api: Api,
              private fileChooser: FileChooser,
              public video: Video,
              public category: Category,
              private googleMaps: GoogleMaps,
              public socket: Socket) {
    this.form = formBuilder.group({
      thumb: [''],
      tags: [[]],
      name: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }


  log() {
    let tags = this.form.controls['tags'].value;
    tags = tags.map((tag) => tag.name);
    console.dir(tags);
  }

  ngAfterViewInit() {
    this.loadMap()
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({'thumb': 'data:image/jpg;base64,' + data});
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({'thumb': imageData});
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['thumb'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.navCtrl.pop();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) {
      return;
    }

    this.upload().subscribe((data) => {
      let filename = JSON.parse(data.response).filename;
      this.item = this.form.value;
      this.item.tags = this.item.tags.map((tag) => tag.name);
      this.item['filename'] = filename;
      this.isUploading = false;
      this.video.create(this.item).subscribe((data) => {
        this.socket.newVideo(data.json().id);
      });

      this.navCtrl.pop();
    }, (error) => {
      alert(error.message);
    })
  }

  getVideoUrl() {
    this.fileChooser.open().then((uri) => {
      this.videoUrl = uri;
    });
  }

  upload() {
    let options = {
      fileKey: 'video',
      fileName: 'file',
    };
    let filePath = this.videoUrl;
    this.isUploading = true;
    return this.api.upload(filePath, options);

  }

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
        this.form.patchValue({'lat': loc.latLng.lat});
        this.form.patchValue({'long': loc.latLng.lng});
        // move the map's camera to position
        map.moveCamera(position);
        // create new marker
        let markerOptions: MarkerOptions = {
          position: loc.latLng,
          title: "you360 video",
          draggable: true,
        };

        map.addMarker(markerOptions)
          .then((marker: Marker) => {
            marker.showInfoWindow();
            marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe((event) => {
              marker.getPosition().then((pos) => {
                this.form.patchValue({'lat': pos.lat});
                this.form.patchValue({'long': pos.lng});
              });
            });
          });
      });
    });

  }
}
