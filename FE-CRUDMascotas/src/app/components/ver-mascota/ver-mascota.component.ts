import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent implements OnInit{

  id: number;
  mascota!: Mascota;
  loading: boolean = false;
  // mascota$!: Observable<Mascota>;

  constructor(private _mascotaServicice: MascotaService,
              private aRoute: ActivatedRoute) {
      // const id = +this.aRoute.snapshot.paramMap.get('id')!;
      // const id = parseInt(this.aRoute.snapshot.paramMap.get('id')!);
      this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    // this.mascota$ = this._mascotaServicice.getMascota(this.id); Pipe Async
    // this.aRoute.params.subscribe(data => {
    //   this.id = data['id'];
    //   this.obtenerMascota();  Modificar cada vez que cambian
    // });
    this.obtenerMascota();
  }

  obtenerMascota(){
    this.loading = true;
    this._mascotaServicice.getMascota(this.id).subscribe(data => {
      this.loading = false; 
      this.mascota = data;
    });
  }


}
