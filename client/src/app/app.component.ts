import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIcon, MatIconRegistry } from '@angular/material/icon'
import { CardComponent } from './components/card/PrimaryCard/primary-card.component';
import { NavComponent } from './components/navbar_mobile/navbar.component';
import { Card2Component } from './components/card/SecondaryCard/secondary-card.component.';
import { HeaderComponent } from './components/header/header.component';
import { NavDesktopComponent } from './components/navbar_desktop/navbar-desktop.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIcon, CardComponent, NavComponent, Card2Component, HeaderComponent, NavDesktopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(
    private matIconReg: MatIconRegistry
  ) {}
  ngOnInit(): void {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }
}
