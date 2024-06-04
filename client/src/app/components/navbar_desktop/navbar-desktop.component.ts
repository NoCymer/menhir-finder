import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'navbar-desktop',
  templateUrl: './navbar-desktop.component.html',
  imports: [MatIcon],
  styleUrl: './navbar-desktop.component.scss',
  standalone: true,
})
export class NavDesktopComponent {
  @Input() src="";
}
