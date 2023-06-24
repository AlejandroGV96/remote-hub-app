import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReservationListComponent } from "../../components/reservations-list/reservation-list.component";
import { Web3Service } from "../../web3.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";
import { Reservation } from "../../models/reservation.model";
import { Router } from "@angular/router";

@Component({
    standalone: true,
    selector: "web3-my-reservations",
    templateUrl: "./my-reservations.component.html",
    styleUrls: ["./my-reservations.component.scss"],
    imports: [CommonModule, ReservationListComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyReservationsComponent {
    private readonly web3Service = inject(Web3Service);
    private readonly router = inject(Router);

    readonly currentAccount = toSignal(this.web3Service.accounts$, {
        initialValue: [],
    });

    readonly hotelAddress = toSignal(this.web3Service.hotelAddress$, {
        initialValue: "",
    });

    readonly myReservations = toSignal(this.web3Service.myReservations$, {
        initialValue: [],
    });

    constructor() {
        this.web3Service.isConnected$.subscribe((isConnected) => {
            if (!isConnected) {
                this.router.navigate(["/"]);
            }
        });
        this.web3Service.getMyReservations();
    }

    async removeReservation(reservation: Reservation) {
        console.log("removeReservation", reservation);
        await this.web3Service.removeReservation(reservation);
    }
}

