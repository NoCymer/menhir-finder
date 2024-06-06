import { Component, Input } from "@angular/core";
import { AuthService } from "../../services/Auth.service";

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    providers: [AuthService],
    standalone: true,
})
export class LoginPage {
    constructor(
        private authService: AuthService
    ) {
        authService.authenticate(
            "asterix@irreductibles.fr",
            "Le Plus Rapide & Intelligent"
        );
    }
}
  