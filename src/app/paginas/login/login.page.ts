import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin!:FormGroup;
  //Guardar Usuario, NO ESTA HECHO
  usu!:any;
  cont!:any;
  
  title = 'aplicacionMovil';
  myControl = new FormControl();
  hide = true;
  visible = false;
  mostrar = true;

  constructor(private api:ApiService, private router: Router, private fb:FormBuilder) {
    if (sessionStorage.getItem('token')==='válido') {
      this.router.navigate(['/publicaciones']);//Con esto ya no puedo acceder al loguin
    }
    
    this.formularioLogin = this.fb.group({
      correo: ["",[Validators.required, Validators.email]],
      password: ["",[Validators.required, Validators.minLength(8), Validators.maxLength(24)]]
    });
    
  } 

  ngOnInit() {

  }

  mostrarC(){
    if (this.hide) {
      this.mostrar = true;
    }else{
      this.mostrar = false;
    }
  }

  enviar(){
    this.visible = true;
  }

  noEnviado(){
    this.visible = false;
  }
  //HACER
  entrar(){
    //localStorage.setItem('token', 'válido');
    sessionStorage.setItem('token', 'válido');
    this.router.navigate(['/publicaciones']);
  }

  registro(){
    this.router.navigate(['/registro']);
  }

  Loguear(){
    if (this.formularioLogin.invalid) {
      return;
    }
    //console.log(this.formularioLogin.value.password);
    this.api.BuscarUsuario(
      this.formularioLogin.value.correo,
      this.formularioLogin.value.password).subscribe(resp => {
        console.log(resp);
        this.entrar();
        this.load(resp);
        this.api.recargarPagina.emit(true);
      },
        (error)=>{alert("Usuario y Contraseña invalidos")}
      );
  }

  load(usu:any){
    const usuario:any = usu;
    usuario.contraseña = null;
    localStorage.setItem('usuario',JSON.stringify(usuario));

  }
}
