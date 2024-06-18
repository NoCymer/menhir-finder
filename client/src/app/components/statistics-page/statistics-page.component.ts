import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { GuessService } from "../../services/Guess.service";
import { PrimaryCardComponent } from "../card/primary-card/primary-card.component";
import { SecondaryCardComponent } from "../card/secondary-card/secondary-card.component";
import { NavbarMobileComponent } from "../navbar-mobile/navbar-mobile.component";
import { MainHeaderComponent } from "../main-header/main-header.component";
import { Router } from "@angular/router";
import { HistoryDto } from "../../dtos/HistoryDto";
import { MatIcon } from "@angular/material/icon";
import { Chart } from "chart.js";

@Component({
    selector: 'statistics-page',
    styleUrl:"./statistics-page.component.scss",
    imports: [PrimaryCardComponent, SecondaryCardComponent, NavbarMobileComponent, MainHeaderComponent, MatIcon],
    providers: [Router],
    templateUrl:"./statistics-page.component.html",
    standalone: true
}) export class StatisticsPage implements AfterViewInit{
    @ViewChild('statsCanvas') statsCanvas!: ElementRef<HTMLCanvasElement>;

    public history: HistoryDto[] = [];
    public asterixPercentage = 50;
    public obelixPercentage = 50;
    public total = 0;

    constructor(
        public guessService: GuessService,
        public router : Router
    ) { }

    ngAfterViewInit(): void {
        this.guessService.history().subscribe({
            next: (hist: HistoryDto[]) => {
                this.history = hist.filter(a => a.win != undefined);
                this.total = this.history.length;
                const chunkSize = 5;
                let chunks: HistoryDto[][] = [];
                for (let i = 0; i < this.total; i += chunkSize) {
                    chunks.push(this.history.slice(i, i + chunkSize));
                }

                let obelixCountsPerChunk = [0];
                let asterixCountsPerChunk = [0];
                chunks.forEach((chunk, i) => {
                    let ctObelix = obelixCountsPerChunk[i];
                    let ctAsterix = asterixCountsPerChunk[i];
                    chunk.forEach((val, j) => {
                        if(val.guess == "Asterix") {
                            ctAsterix++;
                        }
                        else if(val.guess == "Obelix") {
                            ctObelix++;
                        }
                    });
                    obelixCountsPerChunk.push(ctObelix);
                    asterixCountsPerChunk.push(ctAsterix);
                });
                this.obelixPercentage = Math.round((obelixCountsPerChunk[obelixCountsPerChunk.length - 1] / this.total) * 100);
                this.asterixPercentage = Math.round((asterixCountsPerChunk[obelixCountsPerChunk.length - 1] / this.total) * 100);
                console.log(this.obelixPercentage, this.asterixPercentage, this.history)
                let count = this.total / chunkSize;
                let labels = [];
                for(let i = 0; i <= count; i++) {
                    labels.push(5*i);
                }
                if(this.total % 5 != 0) labels.push(this.total);
                const data = {
                    labels: labels,
                    datasets: [
                        {
                            label: "Asterix",
                            data: asterixCountsPerChunk,
                            fill: false,
                            borderColor: "rgb(255, 236, 149)",
                            tension: 0.1
                        },
                        {
                            label: "Obelix",
                            data: obelixCountsPerChunk,
                            fill: false,
                            borderColor: "rgb(149, 211, 255)",
                            tension: 0.1
                        }
                    ]
                };
                
                const config = {
                    type: "line",
                    data: data,
                    options: {},
                };

                new Chart(this.statsCanvas.nativeElement, config);
            },
            error: (error) => { }
        });
    }
}