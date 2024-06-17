import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { DeviceService } from "../services/Device.service";

export const isMobile: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const deviceService: DeviceService = inject(DeviceService);
    const router: Router = inject(Router);
    return deviceService.isMobile ? true : router.createUrlTree(["/"]);
}

export const isDesktop: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const deviceService: DeviceService = inject(DeviceService);
    const router: Router = inject(Router);
    return !deviceService.isMobile ? true : router.createUrlTree(["/"]);
}

    