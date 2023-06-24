import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReservationListComponent } from "../../components/reservations-list/reservation-list.component";
import { Web3Service } from "../../web3.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";
import { Reservation } from "../../models/reservation.model";
import { Router } from "@angular/router";

@Component({
    standalone: true,
    selector: "web3-all-reservations",
    templateUrl: "./all-reservations.component.html",
    styleUrls: ["./all-reservations.component.scss"],
    imports: [CommonModule, ReservationListComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllReservationsComponent {
    private readonly web3Service = inject(Web3Service);
    private readonly router = inject(Router);

    readonly allReservations = toSignal(this.web3Service.allReservations$, {
        initialValue: [],
    });

    readonly currentAccount = toSignal(this.web3Service.accounts$, {
        initialValue: [],
    });

    readonly hotelAddress = toSignal(this.web3Service.hotelAddress$, {
        initialValue: "",
    });

    constructor() {
        this.web3Service.isConnected$.subscribe((isConnected) => {
            if (!isConnected) {
                this.router.navigate(["/"]);
            }
        });
        this.web3Service.getAllReservations();
    }

    async getAllReservations() {
        await this.web3Service.getAllReservations();
    }

    async reservationClicked(reservation: Reservation) {
        await this.web3Service.reserveRoom(reservation);
    }

    async confirmReservation(reservation: Reservation) {
        await this.web3Service.confirmReservation(reservation);
    }

    async consolidateReservation(reservation: Reservation) {
        await this.web3Service.consolidateReservation(reservation);
    }

    async resignReservation(reservation: Reservation) {
        await this.web3Service.makeReservationAvailable(reservation);
    }

    async reclaimReservation(reservation: Reservation) {
        await this.web3Service.reclaimReservation(reservation);
    }

    async removeReservation(reservation: Reservation) {
        await this.web3Service.removeReservation(reservation);
    }
}

