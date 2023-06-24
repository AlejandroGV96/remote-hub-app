import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Signal,
    computed,
    inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Web3Service } from "./web3.service";
import { Router } from "@angular/router";

@Component({
    selector: "web3-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent {
    private readonly web3Service = inject(Web3Service);
    private readonly router = inject(Router);
    private readonly cdr = inject(ChangeDetectorRef);

    readonly isConnected = toSignal(this.web3Service.isConnected$, {
        initialValue: false,
    });
    readonly accounts: Signal<string[]> = toSignal(this.web3Service.accounts$, {
        initialValue: [],
    });
    readonly hotelExists = toSignal(this.web3Service.hotelExists$, {
        initialValue: false,
    });

    readonly allReservations = toSignal(this.web3Service.allReservations$, {
        initialValue: [],
    });

    readonly myReservations = toSignal(this.web3Service.myReservations$, {
        initialValue: [],
    });

    readonly hotelBalance = toSignal(this.web3Service.balance$);

    // Simplified address
    simpleAddress = computed(() => {
        const address = this.accounts()[0];
        if (!address) return "";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    });

    constructor() {
        this.web3Service.cdr = this.cdr;
    }

    connect() {
        this.web3Service.connect();
    }

    removeHotelAddress() {
        this.web3Service.removeHotelAddress();
    }

    async goToAddReservation() {
        this.router.navigate(["/add-reservation"]);
    }

    async createHotel() {
        await this.web3Service.createHotel();
    }

    async setHotelAddress(address: string) {
        this.web3Service.setHotelAddress(address);
    }

    async goToAllReservations() {
        await this.web3Service.getAllReservations();
        await this.router.navigate(["/all-reservations"]);
    }

    async goToMyReservations() {
        await this.web3Service.getMyReservations();
        await this.router.navigate(["/my-reservations"]);
    }

    async withdraw() {
        await this.web3Service.withdrawFunds();
    }
}

