import { Component, Input } from "@angular/core";
import { AuthService } from "../../services/Auth.service";
import { Router } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { NavbarMobileComponent } from "../navbar-mobile/navbar-mobile.component";
import { LoginCardComponent } from "./login-card/login-card.component";
import { MainHeaderComponent } from "../main-header/main-header.component";

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    imports: [MatIcon, NavbarMobileComponent, LoginCardComponent, MainHeaderComponent],
    standalone: true,
})
export class LoginPage {
}
  