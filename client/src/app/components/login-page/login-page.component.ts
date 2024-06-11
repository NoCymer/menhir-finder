import { Component, Input } from "@angular/core";
import { AuthService } from "../../services/Auth.service";
import { Router } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { NavbarMobileComponent } from "../navbar-mobile/navbar-mobile.component";
import { MainHeaderComponent } from "../main-header/main-header.component";
import { NavComponent } from "./login-card/login-card.component";

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    providers: [AuthService],
    imports: [MatIcon, NavbarMobileComponent, MainHeaderComponent, NavComponent],
    standalone: true,
})
export class LoginPage {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.login();
    }

    public login() {
        this.authService.authenticate(
            "asterix@irreductibles.fr",
            "Le Plus Rapide & Intelligent"
        ).subscribe(res => {
            if(res) this.router.navigate(["/"]);
            else return;
        });
    }
}
  