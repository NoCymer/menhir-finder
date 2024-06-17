import { Component, ElementRef, OnInit, ViewChildren } from "@angular/core";
import { GuessService } from "../../services/Guess.service";
import { PrimaryCardComponent } from "../card/primary-card/primary-card.component";
import { SecondaryCardComponent } from "../card/secondary-card/secondary-card.component";
import { NavbarMobileComponent } from "../navbar-mobile/navbar-mobile.component";
import { MainHeaderComponent } from "../main-header/main-header.component";
import { Router } from "@angular/router";

@Component({
    selector: 'result-page',
    styleUrl:"./result-page.component.scss",
    imports: [PrimaryCardComponent, SecondaryCardComponent, NavbarMobileComponent, MainHeaderComponent],
    providers: [Router],
    templateUrl:"./result-page.component.html",
    standalone: true
}) export class ResultPage implements OnInit{
    public src: string = this.getSrc;
    public resultat: string = this.getResultat;
    public invResultat: string = this.getInvResultat;

    constructor(
        public guessService: GuessService,
        public router : Router
    ) { }

    ngOnInit(): void { }
    

    private get getResultat() {
        return this.guessService.latestResult?.guess.guess ?? "";
    }

    private get getInvResultat() {
        switch(this.guessService.latestResult?.guess.guess) {
            case "Asterix":
                return "Obelix";
            case "Obelix":
                return "Asterix";
            default:
                return "";
        }
    }

    private get getSrc() {
        switch(this.guessService.latestResult?.guess.guess) {
            case "Asterix":
                return "../../../assets/img/asterix.png";
            case "Obelix":
                return "../../../assets/img/obelix.png";
            default:
                return "";
        }
    }
}