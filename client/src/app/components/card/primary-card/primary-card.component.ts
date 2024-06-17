import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'primary-card',
  templateUrl: './primary-card.component.html',
  styleUrl: './primary-card.component.scss',
  providers: [Router],
  standalone: true,
})
export class PrimaryCardComponent {
  constructor(
    public router: Router
  ){}
  @Input() src="";
}
