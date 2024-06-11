import { Component, Input } from "@angular/core";
import { AuthService } from "../../services/Auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    providers: [AuthService],
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
  