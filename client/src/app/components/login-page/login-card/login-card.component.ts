import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { AuthService } from "../../../services/Auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'login-card',
    templateUrl: './login-card.component.html',
    styleUrl: './login-card.component.scss',
    providers: [Router],
    imports: [MatIcon],
    standalone: true,
})
export class LoginCardComponent {
    @ViewChild('email') emailInput!: ElementRef<HTMLInputElement>; 
    @ViewChild('password') passwordInput!: ElementRef<HTMLInputElement>; 

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    public login() {
        // this.authService.authenticate(
        //     "asterix@irreductibles.fr",
        //     "Le Plus Rapide & Intelligent"
        // ).subscribe(res => {
        //     if(res) this.router.navigate(["/"]);
        //     else return;
        // });
        this.authService.authenticate(
            this.emailInput.nativeElement.value,
            this.passwordInput.nativeElement.value,
        ).subscribe(res => {
            if(res) {
                console.log("pre nav")
                this.router.navigate(["/"]);
                console.log("post nav")
            }
            else {
                console.log("huh ?")
                return;
            }
        });
    }
}
  