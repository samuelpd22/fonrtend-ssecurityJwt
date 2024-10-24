import { Component, EventEmitter, Output } from '@angular/core';
import { StorageService } from '../service/StorageService';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {

  @Output() loginEvent = new EventEmitter();
  @Output() logoutEvent = new EventEmitter();

  constructor(private storage: StorageService) {}

  isTokenValid(): boolean {
    const token = this.storage.getItem('auth_token');
    return token !== null; // Retorna true se o token existir
  }

}
