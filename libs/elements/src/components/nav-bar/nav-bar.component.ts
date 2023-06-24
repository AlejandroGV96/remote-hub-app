import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from "@angular/core";
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../secondary-button/secondary-button.component";
import { NgIf } from "@angular/common";
import { TextboxComponent } from "..";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
    standalone: true,
    imports: [
        PrimaryButtonComponent,
        SecondaryButtonComponent,
        NgIf,
        TextboxComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
    selector: "agv-nav-bar",
    templateUrl: "./nav-bar.component.html",
    styleUrls: ["./nav-bar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
    @Input() isConnected: boolean = false;
    @Input() hotelExists: boolean = false;
    @Input() address: string = "";
    @Input() hotelBalance?: number | string;

    @Output() connect: EventEmitter<void> = new EventEmitter<void>();
    @Output() createHotel: EventEmitter<void> = new EventEmitter<void>();
    @Output() addReservation: EventEmitter<void> = new EventEmitter<void>();
    @Output() getAllReservations: EventEmitter<void> = new EventEmitter<void>();
    @Output() getMyReservations: EventEmitter<void> = new EventEmitter<void>();
    @Output() hotelAddressChange: EventEmitter<string> =
        new EventEmitter<string>();
    @Output() removeHotelAddress: EventEmitter<void> = new EventEmitter<void>();
    @Output() withdraw: EventEmitter<void> = new EventEmitter<void>();

    hotelAddress = "";

    readonly style: string = `
        padding: 0 8px;
        font-size: 12px;
        text-transform: none;
    `;

    get simpleAddress() {
        return this.address.slice(0, 6) + "..." + this.address.slice(-4);
    }
}

