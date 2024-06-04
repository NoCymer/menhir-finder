import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'card2',
  templateUrl: './card2.component.html',
  styleUrl: './card2.component.scss',
  standalone: true,
})
export class Card2Component {
  @Input() src_asterix="../../../../assets/img/img_card2.png";
  @Input() src_idefix="../../../../assets/img/img_card3.png";
}
