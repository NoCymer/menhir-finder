import { Component, Input } from '@angular/core';

@Component({
  selector: 'primary-card',
  templateUrl: './primary-card.component.html',
  styleUrl: './primary-card.component.scss',
  standalone: true,
})
export class PrimaryCardComponent {
  @Input() src="";
}
