import { Component, ElementRef, OnInit, ViewChildren } from "@angular/core";
import { GuessService } from "../../services/Guess.service";
import { PrimaryCardComponent } from "../card/primary-card/primary-card.component";
import { SecondaryCardComponent } from "../card/secondary-card/secondary-card.component";
import { NavbarMobileComponent } from "../navbar-mobile/navbar-mobile.component";
import { MainHeaderComponent } from "../main-header/main-header.component";
import { Router } from "@angular/router";
import { HistoryDto } from "../../dtos/HistoryDto";
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'history-page',
    styleUrl:"./history-page.component.scss",
    imports: [PrimaryCardComponent, SecondaryCardComponent, NavbarMobileComponent, MainHeaderComponent, MatIcon],
    providers: [Router],
    templateUrl:"./history-page.component.html",
    standalone: true
}) export class HistoryPage implements OnInit{
    public history: HistoryDto[] = [];

    constructor(
        public guessService: GuessService,
        public router : Router
    ) { }

    ngOnInit(): void {
        this.guessService.history().subscribe({
            next: (data: HistoryDto[]) => {
                this.history = data.reverse();
            },
            error: (error) => { }
        });
    }

    public clearGuesses() {
        this.guessService.clearGuesses().subscribe({
            next: (data) => {
                this.history = [];
            },
            error: (error) => { }
        });
    }
}