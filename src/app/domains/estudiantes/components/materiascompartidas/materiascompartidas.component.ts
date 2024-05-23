import { Component, Input, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteService } from '../../../shared/services/estudiante.service';
import { EstudianteMaterias } from '../../../shared/models/estudianteMaterias.modes';

@Component({
  selector: 'app-materiascompartidas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materiascompartidas.component.html',
  styleUrl: './materiascompartidas.component.css'
})
export class MateriascompartidasComponent {
  @Input() idEstudiante: number | undefined;
  estudiantesMT = signal<EstudianteMaterias[]>([]);
  private estudianteService = inject(EstudianteService);

  constructor() {}

  ngOnInit(): void {
    console.log(this.idEstudiante);
    this.getEstudiantesMT();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idEstudiante'] && changes['idEstudiante'].currentValue !== undefined) {
      this.getEstudiantesMT();
    }
  }

  private getEstudiantesMT() {
    const id = this.idEstudiante || 0;
    if(id !== 0) {
      this.estudianteService.getEstudiantesMateria(id)
      .subscribe({
        next: (data) => {
          this.estudiantesMT.set(data);
        },
        error: (error) => {
        }
      });
    }else {
      this.estudiantesMT.set([]);
    }
    
  }

}
