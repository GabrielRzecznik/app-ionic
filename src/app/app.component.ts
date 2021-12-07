import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './servicios/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  usuario!:any;
  interructor!:boolean;
  
  public appPages = [
    { title: 'Publicaciones', url: '/publicaciones', icon: 'paper-plane' },
    { title: 'Publicar', url: '/subir', icon: 'add' },
    { title: 'Perfil', url: '/perfil', icon: 'person' },
    { title: 'Registrarse', url: '/registro', icon: 'at' },
    { title: 'Iniciar Sesión', url: '/login', icon: 'log-in' }
  ];

  constructor(private router: Router, private api:ApiService) {}

  ngOnInit() {
    this.api.recargarPagina.subscribe(resp => {
      console.log(resp);
    })
    this.usuario = JSON.parse(localStorage.getItem('usuario')!);
  }
  
  salir(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
