import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { RegistroestudianteComponent } from '../../components/registroestudiante/registroestudiante.component';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [HeaderComponent, RegistroestudianteComponent],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent {

}
