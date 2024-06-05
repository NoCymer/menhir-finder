import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  imports: [MatIcon],
  styleUrl: './navbar-mobile.component.scss',
  standalone: true,
})
export class NavbarMobileComponent {
  @Input() src="";
}
