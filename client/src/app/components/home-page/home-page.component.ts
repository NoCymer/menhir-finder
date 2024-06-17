import { Component, ElementRef, ViewChildren } from "@angular/core";
import { GuessService } from "../../services/Guess.service";
import { PrimaryCardComponent } from "../card/primary-card/primary-card.component";
import { SecondaryCardComponent } from "../card/secondary-card/secondary-card.component";
import { NavbarMobileComponent } from "../navbar-mobile/navbar-mobile.component";
import { MainHeaderComponent } from "../main-header/main-header.component";
import { Router } from "@angular/router";

@Component({
    selector: 'home-page',
    styleUrl:"./home-page.component.scss",
    imports: [PrimaryCardComponent, SecondaryCardComponent, NavbarMobileComponent, MainHeaderComponent],
    providers: [Router],
    templateUrl:"./home-page.component.html",
    standalone: true
}) export class HomePage {
    
    public onMobile: boolean = false;

    constructor(
        public guessService: GuessService,
        public router : Router
    ) {}
}