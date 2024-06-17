import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DeviceService } from '../../services/Device.service';
import { GuessService } from '../../services/Guess.service';

@Component({
  selector: 'navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  imports: [MatIcon],
  providers: [Router],
  styleUrl: './navbar-mobile.component.scss',
  standalone: true,
})
export class NavbarMobileComponent {
  @Input() src="";

  public isMobile = this.deviceService.isMobile;
  
  constructor(
    public router: Router,
    public deviceService: DeviceService,
    public guessService: GuessService
  ) {}
}
