import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environements";
import { AuthDto } from "../dtos/AuthDto";

@Injectable({providedIn: "root"})
export class AuthService{
    private token?: string = undefined;

    constructor(
        private http: HttpClient
    ) {}

    /**
     * Authenticates a user by its login and password
     * @param login 
     * @param password 
     */
    public authenticate(login: string, password: string) {
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        const body = new HttpParams()
          .set('email', login)
          .set('pass', password);
        
        this.http.post<AuthDto>(
            environment.apiUrl + "login",
            body.toString(),
            options
        )
        .subscribe({
            next: (data: AuthDto) => {
                this.token = data.token;
            },
            error: (error) => {
                if(!(error instanceof HttpErrorResponse)) return;
                switch(error.status) {
                    // Invalid credentials
                    case 401:
                        console.error("invalid creds");
                        break;
                    // Unexpected error
                    default:
                        console.error(error.message);
                        break;
                }
            }
        })
    }

    /**
     * 
     * @returns Whether or not the user is logged in
     */
    public isLogged(): boolean {
        return this.token != undefined;
    }

    /**
     * Returns the token of the logged user or undefined if user not logged in
     * @returns Token of the logged user else undefined
     */
    public getToken(): string | undefined {
        return this.token;
    }
}