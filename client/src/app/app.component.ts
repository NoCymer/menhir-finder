import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIcon, MatIconRegistry } from '@angular/material/icon'
import { CardComponent } from './components/card/card.component';
import { NavComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIcon, CardComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private matIconReg: MatIconRegistry
  ) {}
}
