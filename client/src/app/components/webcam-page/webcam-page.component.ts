import { Component, Input } from "@angular/core";
import { AuthService } from "../../services/Auth.service";
import { Router } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { NavbarMobileComponent } from "../navbar-mobile/navbar-mobile.component";
import { NavComponent } from "../login-page/login-card/login-card.component";
import { MainHeaderComponent } from "../main-header/main-header.component";
import { WebcamComponent } from "./webcam-card/webcam.component";


@Component({
    selector: 'login-page',
    templateUrl: './webcam-page.component.html',
    styleUrl: './webcam-page.component.scss',
    providers: [],
    imports: [MatIcon, NavbarMobileComponent, NavComponent, MainHeaderComponent, WebcamComponent],
    standalone: true,
})
export class WebcamPage {
    constructor(
        private router: Router
    ) {
        
    }
}
  