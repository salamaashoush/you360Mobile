import {Component, OnInit, ViewChild} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {NavController, ViewController} from 'ionic-angular';
import {FileChooser} from '@ionic-native/file-chooser';
import {Camera} from '@ionic-native/camera';
import {Api} from "../../providers/api";
import {Video} from "../../providers/video";
import {Category} from "../../providers/category";


@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage implements OnInit{
  ngOnInit(): void {
   this.category.all().subscribe((data)=>{
     this.categories=data.json().docs;
   })
  }

  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  videoUrl: any;
  item: any;
  categories: any;

  form: FormGroup;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              formBuilder: FormBuilder,
              public camera: Camera,
              public api: Api,
              private fileChooser: FileChooser,
              public video: Video,
              public category:Category) {
    this.form = formBuilder.group({
      thumb: [''],
      name: ['', Validators.required],
      description: ['',Validators.required],
      category:['', Validators.required],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

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
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) {
      return;
    }
    this.viewCtrl.dismiss(this.form.value);
  }
  getVideoUrl(){
    this.fileChooser.open().then((uri) => {
      this.videoUrl = uri;
    });
  }
  upload() {

  }
  createItem(){
    let options = {
      fileKey: 'video',
      fileName: 'file',
    };
    this.api.upload(this.videoUrl, options).subscribe((data)=>{
      this.item.filename=data['filename'];
      return this.video.create(this.item).subscribe((data)=>{
        alert(JSON.stringify(data));
      },(error)=>{
        alert(error.message);
      });
    })
  }
}
