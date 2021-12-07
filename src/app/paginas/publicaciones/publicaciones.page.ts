import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit {
  automovilesPublicados:any;

  constructor(private api:ApiService) {
  }

  ngOnInit() {
    this.CargarPublicaciones();
    this.api.recargarPagina.subscribe(resp => {
      console.log(resp);
      this.CargarPublicaciones();
    })
  }

  CargarPublicaciones(){
    this.api.traerValor().subscribe(resp => {console.log(resp)
      this.automovilesPublicados = resp
      this.automovilesPublicados = this.automovilesPublicados.sort((a:any, b:any)=>a.patente > b.patente ? 1:-1)
    });
  }

}
