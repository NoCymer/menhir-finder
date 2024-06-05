import { Component, Input } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  standalone: true,
})
export class MainHeaderComponent {
  constructor(
    public router: Router
  ) {}
  @Input() src="";
}


