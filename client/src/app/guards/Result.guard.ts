import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { GuessService } from "../services/Guess.service";

export const isAwaitingFeedback: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const guessService: GuessService = inject(GuessService);
    const router: Router = inject(Router);
    return guessService.latestResult != undefined ? true : router.createUrlTree(["/"]);
}
    
export const hasDisplayableStats: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const guessService: GuessService = inject(GuessService);
    const router: Router = inject(Router);
    return guessService.latestStatistics != undefined ? true : router.createUrlTree(["/"]);
}