import { Component, inject, signal } from '@angular/core';
import { MaestroService } from '../../../shared/services/maestro.service';
import { Maestro } from '../../../shared/models/maestro.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-maestro',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './maestro.component.html',
  styleUrl: './maestro.component.css'
})
export class MaestroComponent {
  
  maestros = signal<Maestro[]>([]);
  private maestroService = inject(MaestroService);
  
  ngOnInit() {
    this.getMaestros()
  }

  private getMaestros(valor?: string) {
    this.maestroService.getMaestros(valor)
    .subscribe({
      next: (data) => {
        this.maestros.set(data);
        this.updateLocalStorage(data);
      },
      error: (error) => {
        //console.error(error);
      }
    });
  }

  handleKeydown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Enter') {
      this.getMaestros(input.value);
    }
  }

  private updateLocalStorage(data: Maestro[]) {
    const localStorageKey = 'materiasmaestro';
    if (localStorage.getItem(localStorageKey)) {
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    } else {
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    }
  }  
}
