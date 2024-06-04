import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIcon, MatIconRegistry } from '@angular/material/icon'
import { CardComponent } from './components/card/PrimaryCard/card.component';
import { NavComponent } from './components/navbar/navbar.component';
import { Card2Component } from './components/card/SecondaryCard/card2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIcon, CardComponent, NavComponent, Card2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private matIconReg: MatIconRegistry
  ) {}

  ngOnInit(): void {
      
  }
}
