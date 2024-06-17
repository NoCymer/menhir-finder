import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environements";
import { AuthDto } from "../dtos/AuthDto";
import { jwtDecode } from "jwt-decode";
import { Observable, Observer } from "rxjs";

@Injectable({providedIn: "root"})
export class AuthService{
    private token?: string;

    constructor(
        private http: HttpClient
    ) {
        this.loadCachedToken();
    }

    /**
     * Tries to retrieve a token from the local storage if it exists and if its still valid
     * @returns 
     */
    private loadCachedToken() {
        let token = localStorage.getItem("token") ?? undefined;
        if(!token) return;
        if(this.validateTokenExpDate(token)) this.token = token;
    }

    /**
     * Checks if the given token has not expired
     * @param token 
     * @returns true if valid
     */
    private validateTokenExpDate(token: string): boolean {
        let decoded = jwtDecode(token);
        if(decoded.exp && decoded.exp > (new Date().getTime() / 1000)) return true;
        return false;
    }

    /**
     * Logs out the connected user
     */
    public deauthenticate() {
        this.token = undefined;
        localStorage.setItem("token", "");
    }

    /**
     * Authenticates a user by its login and password
     * @param login 
     * @param password 
     */
    public authenticate(login: string, password: string): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
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
                    localStorage.setItem("token", this.token);
                    observer.next(true);
                },
                error: (error) => {
                    if(!(error instanceof HttpErrorResponse)) return;
                    switch(error.status) {
                        // Invalid credentials
                        case 401:
                            console.error("[ERROR] : Invalid credentials");
                            break;
                        // Unexpected error
                        default:
                            console.error(error.message);
                            break;
                    }
                    observer.next(false);
                }
            });
        });
    }

    /**
     * 
     * @returns Whether or not the user is logged in
     */
    public get isLogged(): boolean {
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

export class InvalidTokenError extends Error {
    constructor() {
        super("The provided token is invalid or expired");
    }
}