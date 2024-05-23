import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaestroComponent } from '../../../maestros/components/maestro/maestro.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule,MaestroComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
