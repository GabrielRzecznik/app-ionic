import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage implements OnInit {
  usuario!:any;
  correo!:any;
  camera!:any;
  automovilesPublicados:any;
  fotoPerfil!:any;
  foto: SafeResourceUrl;

  constructor(private api:ApiService, private sanatizer: DomSanitizer) {
    this.foto = "https://avatars.githubusercontent.com/u/82976982?v=4";
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario')!);

   this.CargarPublicaciones();
    this.api.recargarPagina.subscribe(resp => {
      this.CargarPublicaciones();
    })
  }
  
  CargarPublicaciones(){
    this.api.MisPublicacionesAutomovil().subscribe(resp => {console.log(resp)
      this.automovilesPublicados = resp
      this.automovilesPublicados = this.automovilesPublicados.sort((a:any, b:any)=>a.patente > b.patente ? 1:-1)
    });
  }

  EliminarAutomovil(patente:string){
    //Selecciona el campo para eliminar
    //console.log(patente);

    this.api.EliminarAutomovil(patente).subscribe(resp => {
    this.CargarPublicaciones();
    });
  }
  
  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    
    this.foto = image.webPath;

    //this.foto = this.sanatizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl))
    //var imageUrl = image.webPath;
    //this.fotoPerfil = <string>imageUrl;
    
    //console.log(this.fotoPerfil)
  }
}
