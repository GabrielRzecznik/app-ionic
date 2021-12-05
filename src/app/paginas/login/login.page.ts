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

  constructor(private api:ApiService, private router: Router, private fb:FormBuilder) {
    if (sessionStorage.getItem('token')==='válido') {
      this.router.navigate(['/publicaciones']);//Con esto ya no puedo acceder al loguin
    }
    
    this.formularioLogin = this.fb.group({
      correo: ["",[Validators.required, Validators.email]],
      password: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(24)]]
    });
    
  } 

  ngOnInit() {
    this.api.recargarPagina.emit(true);
  }

  //Validaciónes
  correo = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]);

  //Mensaje error Correo
  getErrorMessageCorreo() {
    if (this.correo.hasError('required')) {
      return 'Ingrese un correo valido';
    }

    return this.correo.hasError('correo') ? 'El correo ingresado no es valido' : '';
  }

  //Mensaje error Contraseña
  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Ingrese su contraseña';
    }

    return this.password.hasError('password') ? 'La contraseña ingresado no es valido' : '';
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

  salir(){
    sessionStorage.removeItem('token');
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
      });
  }

  load(usu:any){
    const usuario:any = usu;
    usuario.contraseña = null;
    localStorage.setItem('usuario',JSON.stringify(usuario));

  }
}
