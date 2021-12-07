import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario!:any;
  correo!:any;
  automovilesPublicados:any;

  constructor(private api:ApiService) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario')!);

   this.CargarPublicaciones();
    this.api.recargarPagina.subscribe(resp => {
      console.log(resp);
      this.CargarPublicaciones();
    })
  }
  
  CargarPublicaciones(){
    this.api.MisPublicacionesAutomovil().subscribe(resp => {console.log(resp)
      this.automovilesPublicados = resp
      this.automovilesPublicados = this.automovilesPublicados.sort((a:any, b:any)=>a.patente > b.patente ? 1:-1)
    });
  }


}
