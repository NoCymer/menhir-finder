import { Component, Input } from "@angular/core";
import { CardComponent } from "../card/primary-card/primary-card.component";
import { Card2Component } from "../card/secondary-card/secondary-card.component";
import { NavbarMobileComponent } from "../navbar-mobile/navbar-mobile.component";
import { MainHeaderComponent } from "../main-header/main-header.component";
import { NavComponent } from "./login-card/login-card.component";
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    imports:  [CardComponent, Card2Component, NavbarMobileComponent, MainHeaderComponent, NavComponent, MatIcon],
    standalone: true,
})
export class LoginPage {
    
}
  