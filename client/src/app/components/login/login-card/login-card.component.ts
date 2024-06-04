import { Component, Input } from "@angular/core";

@Component({
    selector: 'login-card',
    templateUrl: './login-card.component.html',
    styleUrl: './login-card.component.scss',
    standalone: true,
})
    export class NavComponent {
    @Input() src="";
}
  