import { Component, Input } from '@angular/core';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  imports: [MatIcon],
  styleUrl: './navbar.component.scss',
  standalone: true,
})
export class NavComponent {
  @Input() src="";
}
