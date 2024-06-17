import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GuessDto, GuessDtoHistory } from "../dtos/GuessDto";
import { environment } from "../../environements";
import { Router } from "@angular/router";
import { StatisticsDto } from "../dtos/StatisticsDto";
import { HistoryDto } from "../dtos/HistoryDto";
import { Observable, Observer } from "rxjs";
import { AuthService, InvalidTokenError } from "./Auth.service";

@Injectable({providedIn: "root"})
export class GuessService{
    private _latestResult: GuessDtoHistory | undefined;
    private _latestStatistics: StatisticsDto | undefined;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router
    ) { }
    
    public makeGuessFromInputEvent(event: Event) {
        if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement)?.files?.length) {
            const files = (event.target as HTMLInputElement)!.files;
            if(!(files != null && files[0] != null)) return;
            this.makeGuessFromPicture(files[0]);
        }
    }

    public makeGuessFromPicture(file: File) {
        if(file == null) return;

        const body = new FormData();
        body.append('guessimage', file);

        this.http.post<GuessDto>(
            environment.apiUrl + "guesses",
            body
        )
        .subscribe({
            next: (data: GuessDto) => {
                this._latestResult = {
                    guess: data,
                    image: file
                };
                this.router.navigate(["/result"]);
            },
            error: (error) => {
                if(!(error instanceof HttpErrorResponse)) return;
                switch(error.status) {
                    // Unexpected error
                    default:
                        console.error(error.message);
                        break;
                }
            }
        });
    }

    /**
     * If the result is correct
     */
    public valid() {
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        this.http.put<StatisticsDto>(
            environment.apiUrl + "guesses/" + this._latestResult?.guess.id,
            {
                win: 1
            },
            options
        )
        .subscribe({
            next: (data: StatisticsDto) => { this._latestStatistics = data },
            error: (error) => {
                if(!(error instanceof HttpErrorResponse)) return;
                switch(error.status) {
                    // Unexpected error
                    default:
                        console.error(error.message);
                        break;
                }
            }
        });
    }

    /**
     * If the result is wrong
     */
    public invalid() {
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        this.http.put<StatisticsDto>(
            environment.apiUrl + "guesses/" + this._latestResult?.guess.id,
            {
                win: -1
            },
            options
        )
        .subscribe({
            next: (data: StatisticsDto) => { this._latestStatistics = data },
            error: (error) => {
                if(!(error instanceof HttpErrorResponse)) return;
                switch(error.status) {
                    // Unexpected error
                    default:
                        console.error(error.message);
                        break;
                }
            }
        });
    }

    /**
     * If the result is neither asterix nor obelix
     */
    public unaccountable() {
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        this.http.put<StatisticsDto>(
            environment.apiUrl + "guesses/" + this._latestResult?.guess.id,
            {
                win: 0
            },
            options
        )
        .subscribe({
            next: (data: StatisticsDto) => { this._latestStatistics = data },
            error: (error) => {
                if(!(error instanceof HttpErrorResponse)) return;
                switch(error.status) {
                    // Unexpected error
                    default:
                        console.error(error.message);
                        break;
                }
            }
        });
    }

    public history(): Observable<HistoryDto[]> {
        return new Observable((observer: Observer<HistoryDto[]>) => {

            let token = this.authService.getToken();
            if(token == undefined) throw new InvalidTokenError();

            let options = {
                headers: new HttpHeaders()
                    .set('Authorization', 'Bearer ' + token)
            };
            this.http.get<HistoryDto[]>(environment.apiUrl + "guesses", options)
            .subscribe({
                next: (data: HistoryDto[]) => { observer.next(data); },
                error: (error) => {
                    if(!(error instanceof HttpErrorResponse)) return;
                    switch(error.status) {
                        // Unexpected error
                        default:
                            console.error(error.message);
                            break;
                    }
                }
            });
        });
    }

    public clearGuesses(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {

            let token = this.authService.getToken();
            if(token == undefined) throw new InvalidTokenError();

            let options = {
                headers: new HttpHeaders()
                    .set('Authorization', 'Bearer ' + token)
            };
            this.http.delete(environment.apiUrl + "guesses", options)
            .subscribe({
                next: (data) => { observer.next(true); },
                error: (error) => {
                    if(!(error instanceof HttpErrorResponse)) return;
                    switch(error.status) {
                        // Unexpected error
                        default:
                            console.error(error.message);
                            break;
                    }
                }
            });
        });
    }

    public get latestStatistics() {
        return this._latestStatistics;
    }

    public get latestResult() {
        return this._latestResult;
    }
}