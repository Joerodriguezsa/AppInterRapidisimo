import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Maestro } from '../models/maestro.model';
import { Estudiante } from '../models/estudiante.modes';
import { EstudianteMaterias } from '../models/estudianteMaterias.modes';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})

export class EstudianteService {

    private http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    constructor() { }

    public getEstudiantes(): Observable<Estudiante[]> {
        const url = new URL(`${this.apiUrl}/Estudiante`);
        return this.http.get<Estudiante[]>(url.toString());
    }

    public getAllEstudiantesMateria(intEstudianteId: number): Observable<EstudianteMaterias[]> {
        const url = new URL(`${this.apiUrl}/Estudiante/GetAllEstudiantesMateria`);
        url.searchParams.set('intIdEstudiante', intEstudianteId.toString());
        return this.http.get<EstudianteMaterias[]>(url.toString());
    }

    public postEstudiante(intIdEstudiante: number, intMateriaDocente: number): Observable<string> {
        const url = new URL(`${this.apiUrl}/Estudiante/RegisterMateria`);
        url.searchParams.set('intEstudiante', intIdEstudiante.toString());
        url.searchParams.set('intMateriaDocente', intMateriaDocente.toString());
        return this.http.post(url.toString(), {}, { responseType: 'text' });
    }

    public deleteEstudiante(id: number): Observable<any> {
        const url = `${this.apiUrl}/Estudiante/${id}`;
        return this.http.delete(url);
    }

    public getEstudiantesMateria(intIdEstudiante: number): Observable<EstudianteMaterias[]> {
        const url = new URL(`${this.apiUrl}/Estudiante/GetEstudiantes/${intIdEstudiante}`);
        return this.http.get<EstudianteMaterias[]>(url.toString());
    }
}
