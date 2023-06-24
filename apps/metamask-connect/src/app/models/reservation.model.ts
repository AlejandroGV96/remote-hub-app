import { ReservationStatus } from "../enums/reservation-status.enum";

export interface Reservation {
    guestAddress: string;
    price: number;
    roomNumber: number;
    status: ReservationStatus;
    endDate: string | number | Date;
    startDate: string | number | Date;
}

