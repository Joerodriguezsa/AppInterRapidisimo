import { Routes } from '@angular/router';

import { InicioComponent } from './domains/home/pages/inicio/inicio.component';
import { EstudianteComponent } from './domains/estudiantes/pages/estudiante/estudiante.component';

export const routes: Routes = [
    { 
        path: '', 
        component: InicioComponent
    },
    { 
        path: 'registro', 
        component: EstudianteComponent
    }
];
