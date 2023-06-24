import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Output,
    inject,
} from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimaryButtonComponent, TextboxComponent } from "@web3/elements";
import { Reservation } from "../../models/reservation.model";
import { ReservationStatus } from "../../enums/reservation-status.enum";

@Component({
    standalone: true,
    selector: "web3-reservation-card",
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TextboxComponent,
        PrimaryButtonComponent,
    ],
    templateUrl: "./reservation-form.component.html",
    styleUrls: ["./reservation-form.component.scss"],
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationFormComponent {
    @Output() reservation = new EventEmitter<Partial<Reservation>>();
    private readonly fb = inject(FormBuilder).nonNullable;

    readonly reservationForm = this.fb.group({
        price: this.fb.control<number>(0),
        roomNumber: this.fb.control<number>(0),
        endDate: this.fb.control<string>(""),
        startDate: this.fb.control<string>(""),
    });

    onSubmit() {
        this.reservation.emit({
            ...this.reservationForm.value,
            status: ReservationStatus.AVAILABLE,
            startDate: new Date(
                this.reservationForm.value.startDate ?? "",
            ).getTime(),
            endDate: new Date(
                this.reservationForm.value.endDate ?? "",
            ).getTime(),
        });
    }
}

