import { Component, Input } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  @Input() src="";

  constructor(
    router: Router
  ){
    router.navigate(["/login"])
  }
}


