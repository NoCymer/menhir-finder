import { Component, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './primary-card.component.html',
  styleUrl: './primary-card.component.scss',
  standalone: true,
})
export class CardComponent {
  @Input() src="";
}
