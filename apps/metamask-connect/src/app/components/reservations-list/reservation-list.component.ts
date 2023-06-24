import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from "@angular/core";
import { ReservationStatus } from "../../enums/reservation-status.enum";
import { Reservation } from "../../models/reservation.model";
import {
    PrimaryButtonComponent,
    SecondaryButtonComponent,
} from "@web3/elements";
const DEFAULT_ADDRESS: string = "0x0000000000000000000000000000000000000000";
@Component({
    standalone: true,
    imports: [CommonModule, PrimaryButtonComponent, SecondaryButtonComponent],
    selector: "web3-reservation-list",
    templateUrl: "./reservation-list.component.html",
    styleUrls: ["./reservation-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationListComponent {
    readonly stauses = ReservationStatus;
    @Input() hotelAddress = "";
    @Input() currentAccount = "";
    @Input() reservations: Reservation[] = [];
    @Output() reservationClicked = new EventEmitter<Reservation>();
    @Output() confirmReservation = new EventEmitter<Reservation>();
    @Output() consolidateReservation = new EventEmitter<Reservation>();
    @Output() resignReservation = new EventEmitter<Reservation>();
    @Output() reclaimReservation = new EventEmitter<Reservation>();
    @Output() removeReservation = new EventEmitter<Reservation>();

    readonly style: string = `
        padding: 0 8px;
        font-size: 12px;
        text-transform: none;
    `;

    addressOwner(owner: string) {
        if (owner.toLowerCase() === this.currentAccount.toLowerCase())
            return "You";
        else if (owner === DEFAULT_ADDRESS) return "No owner";
        else return owner;
    }

    hotelOrNoOwner(owner: string): boolean {
        owner = owner.toLowerCase();
        return (
            owner === DEFAULT_ADDRESS ||
            owner === this.hotelAddress.toLowerCase()
        );
    }
}

