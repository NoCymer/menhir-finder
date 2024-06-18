import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/Auth.service";

export const isAuthentified: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    let isLogged = authService.isLogged;
    return isLogged ? true : router.createUrlTree(["/", 'login']);
}

export const isNotAuthentified: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    let isLogged = authService.isLogged;
    return !isLogged ? true : router.createUrlTree(["/"]);
}

    