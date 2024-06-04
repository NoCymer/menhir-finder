import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

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
