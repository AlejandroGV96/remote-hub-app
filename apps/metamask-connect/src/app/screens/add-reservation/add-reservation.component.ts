import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Web3Service } from "../../web3.service";
import { Reservation } from "../../models/reservation.model";
import { ReservationFormComponent } from "../../components/reservation-form/reservation-form.component";
import { Router } from "@angular/router";

@Component({
    standalone: true,
    selector: "web3-add-reservation",
    templateUrl: "./add-reservation.component.html",
    styleUrls: ["./add-reservation.component.scss"],
    imports: [CommonModule, ReservationFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReservationComponent {
    private readonly web3Service = inject(Web3Service);
    private readonly router = inject(Router);

    constructor() {
        this.web3Service.isConnected$.subscribe((isConnected) => {
            if (!isConnected) {
                this.router.navigate(["/"]);
            }
        });
    }

    async addReservation(reservation: Reservation | Partial<Reservation>) {
        await this.web3Service.addReservation(reservation as Reservation);
    }
}

