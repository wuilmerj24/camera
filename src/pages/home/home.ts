import { Component,ViewChild,NgZone } from '@angular/core';
import { NavController, NavParams , ModalController, AlertController,ActionSheetController,LoadingController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraPage } from '../camera/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public fotoProducto;
	public images=[];
  constructor(public navCtrl: NavController, private camera:Camera,private actionSheetCtrl:ActionSheetController,private ngzone:NgZone,private loadingCtrl:LoadingController) {

  }
  fotoOptions(){
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Albúm',
          icon:"images",
          handler: () => {
            console.log('Destructive clicked');
            this.opcionAlbun();
          }
        },{
          text: 'Tomar Foto',
          icon:"camera",
          handler: () => {
            this.openCamera();
          }
        },{
          text: 'Cancelar',
          icon:"close",
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
  opcionAlbun(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      allowEdit:true,
    }
    let loader=this.loadingCtrl.create({
      content:'Espere por favor...'
    })
    loader.present();
    this.camera.getPicture(options).then((imageData) => {
      loader.dismiss();
      loader.onDidDismiss(()=>{
        this.ngzone.run(()=>{
            this.fotoProducto = 'data:image/jpeg;base64,' + imageData;
            console.log(JSON.stringify(this.fotoProducto)+this.fotoProducto);
            this.images.push(this.fotoProducto);
             //console.log(JSON.stringify(this.images));
        })
      });
    }).catch(error =>{
      console.error( error );
    });
  }

  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: true,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.CAMERA,
      allowEdit:true,

    }
    let loader=this.loadingCtrl.create({
      content:'Espere por favor...'
    })
    loader.present();
    this.camera.getPicture(options).then((imageData) => {
  		loader.dismiss();
      loader.onDidDismiss(()=>{
        this.ngzone.run(()=>{
            this.fotoProducto = 'data:image/jpeg;base64,' + imageData;
            console.log(JSON.stringify(this.fotoProducto)+this.fotoProducto);
            this.images.push(this.fotoProducto);
             //console.log(JSON.stringify(this.images));
        })
      });
    }).catch(error =>{
      console.error( error );
    });
  }
}
