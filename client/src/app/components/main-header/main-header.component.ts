import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth.service';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  providers: [AuthService],
  standalone: true,
})
export class MainHeaderComponent {
  constructor(
    public router: Router,
    public authService: AuthService
  ) {}
  @Input() src="";

  public deauth() {
    this.authService.deauthenticate();
  }
}


