import { Component, Input } from '@angular/core';

@Component({
  selector: 'secondary-card',
  templateUrl: './secondary-card.component.html',
  styleUrl: './secondary-card.component.scss',
  standalone: true,
})
export class SecondaryCardComponent {
  @Input() src="";
  @Input() title="";
}
