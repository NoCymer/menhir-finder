import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class DeviceService{
    /**
     * @returns True if the device is a mobile device
     */
    public get isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
}