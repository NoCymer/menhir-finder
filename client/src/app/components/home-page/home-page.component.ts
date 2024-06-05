import { Component, ElementRef, ViewChildren } from "@angular/core";
import { GuessService } from "../../services/GuessService.service";
import { CardComponent } from "../card/primary-card/primary-card.component";
import { Card2Component } from "../card/secondary-card/secondary-card.component";
import { NavbarMobileComponent } from "../navbar-mobile/navbar-mobile.component";
import { MainHeaderComponent } from "../main-header/main-header.component";

@Component({
    selector: 'home-page',
    styleUrl:"./home-page.component.scss",
    imports: [CardComponent, Card2Component, NavbarMobileComponent, MainHeaderComponent],
    providers: [GuessService],
    templateUrl:"./home-page.component.html",
    standalone: true
}) export class HomePage {
    
    public onMobile: boolean = false;

    constructor(
        public guessService: GuessService
    ) {}
}