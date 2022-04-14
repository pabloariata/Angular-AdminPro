import { environment } from "src/environments/environment";
import { Hospital } from './hospital.model';

const base_url = environment.base_url;

interface _medicoUser {
    _id: string;
    nombre: string;
    img: string;
}

export class Medico {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _medicoUser,
        public hospital?: Hospital

    ) {}

}