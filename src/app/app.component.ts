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
  //appPages!:Array<any>;

  public appPages = [
    { title: 'Publicaciones', url: '/publicaciones', icon: 'paper-plane' },
    //{ title: 'Publicar', url: '/subir', icon: 'add' },//
    //{ title: 'Perfil', url: '/perfil', icon: 'person' },//
    { title: 'Registrarse', url: '/registro', icon: 'at' },
    { title: 'Iniciar Sesión', url: '/login', icon: 'log-in' }
  ];

  constructor(private router: Router, private api:ApiService) {}

  ngOnInit() {
    this.api.recargarPagina.subscribe(resp => {
      console.log(resp);
      if (JSON.parse(localStorage.getItem('usuario')!)) {
        this.appPages = [
          { title: 'Publicaciones', url: '/publicaciones', icon: 'paper-plane' },
          { title: 'Publicar', url: '/subir', icon: 'add' },//
          { title: 'Perfil', url: '/perfil', icon: 'person' },//
          //{ title: 'Registrarse', url: '/registro', icon: 'at' },
          //{ title: 'Iniciar Sesión', url: '/login', icon: 'log-in' }
        ]
      }else{
        this.appPages = [
          { title: 'Publicaciones', url: '/publicaciones', icon: 'paper-plane' },
          { title: 'Registrarse', url: '/registro', icon: 'at' },
          { title: 'Iniciar Sesión', url: '/login', icon: 'log-in' }
        ]
      }
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);
    }) 
  }
  
  salir(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.api.recargarPagina.emit(true);
  }

  toggleTheme(event){
    if(event.detail.checked){
      document.body.setAttribute('color-theme','dark');
    }else{
      document.body.setAttribute('color-theme','light');
    }
  }
}
