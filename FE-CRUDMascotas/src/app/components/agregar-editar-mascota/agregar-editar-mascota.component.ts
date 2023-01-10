import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit{
  loading: boolean = false;
  form: FormGroup;
  id: number;

  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
              private _mascotaService: MascotaService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required],
    });

    this.id = Number(this.aRouter.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    
    if (this.id != 0) {
      this.operacion = 'Editar';
      this.obtenerMascota(this.id);
    }
  }

  obtenerMascota(id: number) {
    this.loading = true;
    this._mascotaService.getMascota(id).subscribe(data => {
      // this.form.patchValue({ Deja poner unos pocos valores
      this.form.setValue({ //Se tiene que poner todos los valores
        nombre: data.nombre,
        raza: data.raza,
        color: data.color,
        edad: data.edad,
        peso: data.peso
      });
      this.loading = false;
    });
  }

  agregarEditarMascota() {
    //const {value: {nombre, raza, color, edad, peso}} = this.form;
    //const nombre = this.form.value.nombre;
    //const nombre = this.form.get('nombre')?.value;
    const mascota: Mascota = {
      nombre: this.form.get('nombre')?.value,
      raza: this.form.get('raza')?.value,
      color: this.form.get('color')?.value,
      edad: this.form.get('edad')?.value,
      peso: this.form.get('peso')?.value,
    };
    if (this.id != 0) {
      mascota.id = this.id;
      this.editarMascota(this.id, mascota)
    } else {
      this.agregarMascota(mascota);
    }
  }

  editarMascota(id: number, mascota: Mascota) {
    this.loading = true;
    this._mascotaService.updateMascota(id, mascota).subscribe(() => {
      this.loading = false;
      this.mensajeExito('editada');
      this.router.navigate(['/listMascotas']);
    });
  }

  agregarMascota(mascota: Mascota) {
    this._mascotaService.addMascota(mascota).subscribe(data => {
      this.mensajeExito('agregada');
      this.router.navigate(['/listMascotas']);
    });
  }

  mensajeExito(text: string) {
    this._snackBar.open(`La mascota fue ${text} con exito`,'', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
}
