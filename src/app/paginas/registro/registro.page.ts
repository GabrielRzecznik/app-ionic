import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro!:FormGroup;
  hide = true;
  visible = false;
  mostrar = true;

  constructor(private api:ApiService, private router: Router, private fb:FormBuilder) {
    this.formularioRegistro = this.fb.group({
      nombre: ["",[Validators.required, Validators.minLength(3), Validators.maxLength(9)]],
      apellido: ["",[Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      correo: ["",[Validators.required, Validators.email]],
      password: ["",[Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
      password2: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      provincia: ["",[Validators.required]],
      edad: ["",[Validators.required]]
    });
  }

  ngOnInit() {
    
  }

  atras(){
    this.router.navigate(['/login']);
  }

  CrearUsuario(){
    if (this.formularioRegistro.invalid && (this.formularioRegistro.value.password == this.formularioRegistro.value.password2)) {
      return;
    }
    if (this.formularioRegistro.value.password != this.formularioRegistro.value.password2) {
      alert("Las contraseñas no son iguales")
    }else{
      console.log(this.formularioRegistro.value);
      this.api.RegistrarUsuario(
        this.formularioRegistro.value.nombre,
        this.formularioRegistro.value.apellido,
        this.formularioRegistro.value.correo,
        this.formularioRegistro.value.password,
        this.formularioRegistro.value.provincia,
        this.formularioRegistro.value.edad).subscribe(resp => {
          console.log(resp);
          alert("Usuario Creado con exito");
          this.router.navigate(['/login'])
        }),(error)=>{alert("No se pudo crear el usuario!")};
    }
  }

  mostrarC(){
    if (this.hide) {
      this.mostrar = true;
    }else{
      this.mostrar = false;
    }
  }
}
