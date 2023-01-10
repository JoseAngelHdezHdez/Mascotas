import { NumberValueAccessor } from "@angular/forms";

export interface Mascota {
    id?: number,
    nombre: string,
    edad: number,
    raza: string,
    color: string,
    peso: number
}