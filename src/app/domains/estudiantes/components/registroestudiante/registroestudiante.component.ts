import { Component, inject, signal } from '@angular/core';
import { EstudianteService } from '../../../shared/services/estudiante.service';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../../../shared/models/estudiante.modes';
import { EstudianteMaterias } from '../../../shared/models/estudianteMaterias.modes';
import { Maestro } from '../../../shared/models/maestro.model';
import { MateriascompartidasComponent } from '../materiascompartidas/materiascompartidas.component';

@Component({
  selector: 'app-registroestudiante',
  standalone: true,
  imports: [CommonModule, MateriascompartidasComponent],
  templateUrl: './registroestudiante.component.html',
  styleUrl: './registroestudiante.component.css'
})
export class RegistroestudianteComponent {
  divRegistro = false;
  estudiantes = signal<Estudiante[]>([]);
  estudianteMaterias = signal<EstudianteMaterias[]>([]);
  estudianteId = signal<number>(0);
  private estudianteService = inject(EstudianteService);

  materiasMaestro: Maestro[] = [];
  filteredMateriasMaestro: Maestro[] = [];
  selectedMateriaMaestro: Maestro | null = null;

  ngOnInit() {
    this.getEstudiantes()
  }

  private getEstudiantes() {
    this.estudianteService.getEstudiantes()
      .subscribe({
        next: (data) => {
          this.estudiantes.set(data);
        },
        error: (error) => {
        }
      });
  }

  private getAllEstudiantesMateria() {
    const id = this.estudianteId();
    this.estudianteService.getAllEstudiantesMateria(id)
      .subscribe({
        next: (data) => {
          this.estudianteMaterias.set(data);
        },
        error: (error) => {
        }
      });
  }

  onSelected(event: any) {
    const selectedId = Number(event.target.value);
    this.filteredMateriasMaestro = [];
    if (!isNaN(selectedId)) {
      this.estudianteId.set(selectedId);
      this.divRegistro = true;
      this.getAllEstudiantesMateria();
    } else {
      this.divRegistro = false;
      this.estudianteId.set(0);
      this.estudianteMaterias.set([]);
    }
  }

  getMateriasMaestroFromLocalStorage() {
    const data = localStorage.getItem('materiasmaestro');
    if (data) {
      this.materiasMaestro = JSON.parse(data);
      this.filteredMateriasMaestro = [...this.materiasMaestro];
    }
  }

  selectMateriaMaestro(materiaMaestro: Maestro) {
    this.selectedMateriaMaestro = materiaMaestro;
  }

  registrarMateria() {
    if (this.selectedMateriaMaestro) {
      const id = this.estudianteId();
      const idmateria = this.selectedMateriaMaestro.id;

      this.estudianteService.postEstudiante(id, idmateria).subscribe({
        next: (data) => {
            this.getAllEstudiantesMateria();
            alert(data);
        },
        error: (error) => {
        }
    });
    } else {
      alert('Por favor selecciona una materia para registrar.');
    }
  }

  onSearch(event: any) {
    
    const searchTerm = event.target.value.toLowerCase();
    if(searchTerm !== ''){
      this.getMateriasMaestroFromLocalStorage();
      this.filteredMateriasMaestro = this.materiasMaestro.filter(materiaMaestro =>
        materiaMaestro.docenteCedula.toLowerCase().includes(searchTerm) ||
        materiaMaestro.docenteNombre.toLowerCase().includes(searchTerm) ||
        materiaMaestro.materiaNombre.toLowerCase().includes(searchTerm)
      );
    }else{
      this.filteredMateriasMaestro = [];
    }
    
  }

  eliminarMateriaRegistrada(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta materia registrada?')) {
        this.estudianteService.deleteEstudiante(id).subscribe(
            () => {
                alert('Materia eliminada correctamente.');
                this.getAllEstudiantesMateria();
            },
            error => {
            }
        );
    }
}
}