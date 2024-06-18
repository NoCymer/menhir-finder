import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { GuessService } from "../../../services/Guess.service";
import { PrimaryCardComponent } from "../../card/primary-card/primary-card.component";
import { SecondaryCardComponent } from "../../card/secondary-card/secondary-card.component";
import { NavbarMobileComponent } from "../../navbar-mobile/navbar-mobile.component";
import { MainHeaderComponent } from "../../main-header/main-header.component";
import { Router } from "@angular/router";
import { Chart } from "chart.js";

@Component({
    selector: 'stats-result-page',
    styleUrl:"./stats-result-page.component.scss",
    imports: [PrimaryCardComponent, SecondaryCardComponent, NavbarMobileComponent, MainHeaderComponent],
    providers: [Router],
    templateUrl:"./stats-result-page.component.html",
    standalone: true
}) export class StatsResultPage implements AfterViewInit{
    @ViewChild('statsCanvas') statsCanvas!: ElementRef<HTMLCanvasElement>;

    constructor(
        public guessService: GuessService,
        public router : Router
    ) { }

    ngAfterViewInit(): void {
        let stats = this.guessService.latestStatistics;
        if(stats == undefined) return;
        const dataPie = {
            labels: ["Echecs", "Reussite"],
            datasets: [
              {
                data: [stats.total - stats.win, stats.win],
                backgroundColor: [
                  "rgb(255, 236, 149)",
                  "rgb(149, 211, 255)",
                ],
                hoverOffset: 4,
              },
            ],
          };
        
          const configPie = {
            type: "pie",
            data: dataPie,
            options: {},
          };

        new Chart(this.statsCanvas.nativeElement, configPie);
    }
}