import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-subir',
  templateUrl: './subir.page.html',
  styleUrls: ['./subir.page.scss'],
})
export class SubirPage implements OnInit {
  formularioAutomovil!:FormGroup;

  constructor(private api:ApiService, private router: Router, private fb:FormBuilder) {
    
    this.formularioAutomovil = this.fb.group({
      patente: ["",[Validators.required, Validators.minLength(7), Validators.maxLength(9)]],
      marca: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      modelo: ["",[Validators.required, Validators.minLength(1), Validators.maxLength(24)]],
      version: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      color: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      estado: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      cambio: ["",Validators.required],
      combustible: ["",Validators.required],
      valor:["",[Validators.required, Validators.minLength(3), Validators.maxLength(7), Validators.pattern(/^[0-9]\d*$/)]],
      kilometraje: ["",[Validators.required, Validators.minLength(1), Validators.maxLength(7), Validators.pattern(/^[0-9]\d*$/)]],
      anio: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^[0-9]\d*$/)]],
      //propietario: ["",Validators.required]
    });
  }

  ngOnInit() {
  }

  CrearAutomovil(){
    if (this.formularioAutomovil.invalid) {
      return;
    }
    console.log(this.formularioAutomovil.value);
    this.api.PublicarAutomovil(
      this.formularioAutomovil.value.patente,
      this.formularioAutomovil.value.marca,
      this.formularioAutomovil.value.modelo,
      this.formularioAutomovil.value.version,
      this.formularioAutomovil.value.color,
      this.formularioAutomovil.value.estado,
      this.formularioAutomovil.value.cambio,
      this.formularioAutomovil.value.combustible,
      this.formularioAutomovil.value.valor,
      this.formularioAutomovil.value.kilometraje,
      this.formularioAutomovil.value.anio).subscribe(resp => {
        console.log(resp);
        this.api.recargarPagina.emit(true);
        alert("Publicación creada con éxito!!")
        this.router.navigate(['/perfil']);
        //this.automovilesPublicados.push(resp);
      }),(error)=>{alert("No se pudo crear la publicación!")};  
  }

}
