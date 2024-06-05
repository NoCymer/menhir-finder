import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIcon, MatIconRegistry } from '@angular/material/icon'
import { NavComponent } from './components/navbar_mobile/navbar.component';
import { HeaderComponent } from './components/header/header.component';


@Component({
  selector: 'connexion-root',
  standalone: true,
  imports: [RouterOutlet, MatIcon, NavComponent, HeaderComponent],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent implements OnInit{
  constructor(
    private matIconReg: MatIconRegistry
  ) {}
  ngOnInit(): void {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }
}
