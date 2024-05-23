import { HttpClient } from '@angular/common/http';
import { Injectable, inject }  from '@angular/core';
import { Maestro } from '../models/maestro.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})

export class MaestroService {

    private http = inject(HttpClient);
    apiUrl = environment.apiUrl;
    
    constructor() { }

    public getMaestros(strMateria?: string) {
        const url = new URL(`${this.apiUrl}/Docente/Materias`);
        if(strMateria){
            url.searchParams.set('strMateria', strMateria);
        
        }
        return this.http.get<Maestro[]>(url.toString());
    }
}