import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GuessDto } from "../dtos/GuessDto";
import { environment } from "../../environements";
import { Router } from "@angular/router";

@Injectable({providedIn: "root"})
export class GuessService{
    constructor(
        private http: HttpClient,
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
                console.table(data)
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
}