import { ChangeDetectorRef, Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest } from "rxjs";
import { BigNumber, ethers } from "ethers";
import { abi, contractAddress } from "../constants/ReservationSystemFactory";
import { Reservation } from "./models/reservation.model";

@Injectable({
    providedIn: "root",
})
export class Web3Service {
    cdr?: ChangeDetectorRef;

    // #region State
    #isConnected = new BehaviorSubject<boolean>(false);
    isConnected$ = this.#isConnected.asObservable();

    #accounts = new BehaviorSubject<string[]>([]);
    accounts$ = this.#accounts.asObservable();

    #hotelAddress = new BehaviorSubject<string>("");
    hotelAddress$ = this.#hotelAddress.asObservable();

    #hotelExists = new BehaviorSubject<boolean>(false);
    hotelExists$ = this.#hotelExists.asObservable();

    #allReservations = new BehaviorSubject<Reservation[]>([]);
    allReservations$ = this.#allReservations.asObservable();

    #myReservations = new BehaviorSubject<Reservation[]>([]);
    myReservations$ = this.#myReservations.asObservable();

    #balance = new BehaviorSubject<string>("");
    balance$ = this.#balance.asObservable();
    // #endregion

    constructor() {
        window.ethereum.on(
            "accountsChanged",
            (accounts: string[] | unknown) => {
                const accs = accounts as string[];
                if (accs.length === 0) {
                    this.#isConnected.next(false);
                    this.#accounts.next([]);
                } else {
                    this.#isConnected.next(true);
                    this.#accounts.next(accs);
                    if (this.#hotelAddress.value) {
                        this.getMyReservations();
                        this.getAllReservations();
                    }
                }
                this.cdr?.detectChanges();
            },
        );
        this.getContract().then((contract) => {
            contract.on("ReservationAdded", (reservation: Reservation) => {
                console.log("ReservationAdded", reservation);
                this.getAllReservations();
            });
        });

        this.getContract().then((contract) => {
            contract.on("ReservationsChanged", (success: true) => {
                console.log("ReservationsChanged", success);
                this.getAllReservations();
            });
        });

        this.getContract().then((contract) => {
            contract.on("BalanceChanged", (success: true) => {
                console.log("BalanceChanged", success);
                this.getBalance();
            });
        });

        combineLatest([this.hotelAddress$, this.accounts$]).subscribe(
            ([hotelAddress, accounts]) => {
                if (hotelAddress.length > 0) {
                    this.hotelExists(hotelAddress).then((exists) => {
                        if (!exists) {
                            this.#allReservations.next([]);
                            this.#myReservations.next([]);
                        }
                        this.getMyReservations();
                        this.getAllReservations();
                    });
                }
                if (
                    hotelAddress?.toLowerCase() === accounts[0]?.toLowerCase()
                ) {
                    console.log("getting balance...");
                    this.getBalance();
                } else {
                    this.#balance.next("");
                }
            },
        );
    }

    removeHotelAddress() {
        this.#hotelAddress.next("");
        this.#hotelExists.next(false);
        this.#allReservations.next([]);
        this.#myReservations.next([]);
    }

    // #region all users
    async getAllReservations() {
        if (!this.isEtheremIsInstalled()) return;
        if (!this.#hotelAddress.value) return;
        try {
            const contract = await this.getContract();
            const reservations = await contract["hfGetAllReservations"](
                this.#hotelAddress.value,
            );
            const parsedReservations = reservations.map(
                (reservation: Reservation) => {
                    return {
                        guestAddress: reservation.guestAddress,
                        price: reservation.price.toString(),
                        roomNumber: reservation.roomNumber.toString(),
                        status: reservation.status.toString(),
                        endDate: new Date(
                            Number(reservation.endDate.toString()),
                        ),
                        startDate: new Date(
                            Number(reservation.startDate.toString()),
                        ),
                    };
                },
            );
            this.#allReservations.next(parsedReservations);
            this.cdr?.detectChanges();
        } catch (e) {
            const error = e as { message: string };
            this.errorHandler(
                error,
                "Invalid address, transaction reverted!",
                "Address is not a hotel!",
            );
        }
    }

    async getMyReservations() {
        if (!this.isEtheremIsInstalled()) return;
        if (!this.#hotelAddress.value) return;
        try {
            const contract = await this.getContract();
            const reservations = await contract["hfGetMyReservations"](
                this.#hotelAddress.value,
            );

            const filteredReservations = reservations.filter(
                (reservation: Reservation) =>
                    reservation.startDate.toString() !== "0" &&
                    reservation.endDate.toString() !== "0" &&
                    reservation.price.toString() !== "0" &&
                    reservation.roomNumber.toString() !== "0",
            );
            const parsedReservations = filteredReservations.map(
                (reservation: Reservation) => {
                    return {
                        guestAddress: reservation.guestAddress,
                        price: reservation.price.toString(),
                        roomNumber: reservation.roomNumber.toString(),
                        status: reservation.status.toString(),
                        endDate: new Date(
                            Number(reservation.endDate.toString()),
                        ),
                        startDate: new Date(
                            Number(reservation.startDate.toString()),
                        ),
                    };
                },
            );
            this.#myReservations.next(parsedReservations);
            this.cdr?.detectChanges();
        } catch (e) {
            const error = e as { message: string };
            this.errorHandler(
                error,
                "Invalid address, transaction reverted!",
                "Address is not a hotel!",
            );
        }
    }

    async reserveRoom(reservation: Reservation) {
        if (!this.isEtheremIsInstalled()) return;
        try {
            const contract = await this.getContract();
            const usdPrice = await contract["getReservationPrice"](
                reservation.price,
            );
            const txData = [
                this.#hotelAddress.value,
                {
                    guestAddress: reservation.guestAddress,
                    price: Number(reservation.price),
                    roomNumber: Number(reservation.roomNumber),
                    status: Number(reservation.status),
                    endDate: (reservation.endDate as Date).getTime(),
                    startDate: (reservation.startDate as Date).getTime(),
                },
                {
                    value: ethers.utils.parseEther(
                        ethers.utils.formatEther(
                            BigNumber.from(usdPrice.toString()).toString(),
                        ),
                    ),
                },
            ];
            const tx = await contract["hfReserveRoom"](...txData);
            await this.listenForTxMine(tx, "reserve room");
        } catch (e) {
            const error = e as { message: string };
            this.errorHandler(error, "Invalid data, transaction reverted!");
        }
    }

    async makeReservationAvailable(reservation: Reservation) {
        if (!this.isEtheremIsInstalled()) return;
        try {
            const contract = await this.getContract();
            const tx = await contract["hfMakeReservationAvailable"](
                this.#hotelAddress.value,
                {
                    guestAddress: reservation.guestAddress,
                    price: Number(reservation.price),
                    roomNumber: Number(reservation.roomNumber),
                    status: Number(reservation.status),
                    endDate: (reservation.endDate as Date).getTime(),
                    startDate: (reservation.startDate as Date).getTime(),
                },
            );
            await this.listenForTxMine(tx, "make reservation available");
        } catch (e) {
            const error = e as { message: string };
            this.errorHandler(error, "Invalid data, transaction reverted!");
        }
    }

    async reclaimReservation(reservation: Reservation) {
        if (!this.isEtheremIsInstalled()) return;
        try {
            const contract = await this.getContract();
            const tx = await contract["hfReclaimRoom"](
                this.#hotelAddress.value,
                {
                    guestAddress: reservation.guestAddress,
                    price: Number(reservation.price),
                    roomNumber: Number(reservation.roomNumber),
                    status: Number(reservation.status),
                    endDate: (reservation.endDate as Date).getTime(),
                    startDate: (reservation.startDate as Date).getTime(),
                },
            );
            await this.listenForTxMine(tx, "reclaim reservation");
        } catch (e) {
            const error = e as { message: string };
            this.errorHandler(error, "Invalid data, transaction reverted!");
        }
    }

    // TODO: test
    async confirmReservation(reservation: Reservation) {
        if (!this.isEtheremIsInstalled()) return;
        try {
            const contract = await this.getContract();
            const tx = await contract["hfConfirmReservation"](
                this.#hotelAddress.value,
                {
                    guestAddress: reservation.guestAddress,
                    price: Number(reservation.price),
                    roomNumber: Number(reservation.roomNumber),
                    status: Number(reservation.status),
                    endDate: (reservation.endDate as Date).getTime(),
                    startDate: (reservation.startDate as Date).getTime(),
                },
            );
            await this.listenForTxMine(tx, "confirm reservation");
        } catch (e) {
            const error = e as { message: string };
            this.errorHandler(error, "Invalid data, transaction reverted!");
        }
    }

    // #endregion

    // #region hotel owners only
    async createHotel() {
        if (!this.isEtheremIsInstalled()) return;
        try {
            const contract = await this.getContract();
            const tx = await contract["createNewHotel"]();
            await this.listenForTxMine(tx, "create hotel");
        } catch (e) {
            const error = e as { message: string };
            this.errorHandler(error, "You already have a hotel!");
        }
    }

    async addReservation(reservation: Reservation) {
        if (!this.isEtheremIsInstalled()) return;
        try {
            const contract = await this.getContract();
            const tx = await contract["hfAddReservation"]({
                guestAddress: this.#accounts.value[0],
                price: reservation.price,
                roomNumber: reservation.roomNumber,
                status: reservation.status,
                endDate: reservation.endDate,
                startDate: reservation.startDate,
            });
            await this.listenForTxMine(tx, "add reservation");
        } catch (e) {
            const error = e as { message: string };
            this.errorHandler(error, "Invalid data, transaction reverted!");
        }
    }

    async removeReservation(reservation: Reservation) {
        if (!this.isEtheremIsInstalled()) return;
        try {
            const contract = await this.getContract();
            const tx = await contract["hfRemoveReservation"]({
                guestAddress: reservation.guestAddress,
                price: Number(reservation.price),
                roomNumber: Number(reservation.roomNumber),
                status: Number(reservation.status),
                endDate: (reservation.endDate as Date).getTime(),
                startDate: (reservation.startDate as Date).getTime(),
            });
            await this.listenForTxMine(tx, "remove reservation");
        } catch (e) {
            const error = e as { message: string };
            this.errorHandler(error, "Invalid data, transaction reverted!");
        }
    }

    // TODO: test
    async removeConsolidatedReservations() {
        if (!this.isEtheremIsInstalled()) return;
        try {
            const contract = await this.getContract();
            const tx = await contract["hfRemoveConsolidatedReservations"]();
            await this.listenForTxMine(tx, "remove consolidated reservations");
        } catch (e) {
            const error = e as { message: string };
            this.errorHandler(error, "Invalid data, transaction reverted!");
        }
    }

    // TODO: test
    async consolidateReservation(reservation: Reservation) {
        if (!this.isEtheremIsInstalled()) return;
        try {
            const contract = await this.getContract();
            const tx = await contract["hfConsolidateReservation"]({
                guestAddress: reservation.guestAddress,
                price: Number(reservation.price),
                roomNumber: Number(reservation.roomNumber),
                status: Number(reservation.status),
                endDate: (reservation.endDate as Date).getTime(),
                startDate: (reservation.startDate as Date).getTime(),
            });
            await this.listenForTxMine(tx, "consolidate reservation");
        } catch (e) {
            const error = e as { message: string };
            this.errorHandler(error, "Invalid data, transaction reverted!");
        }
    }

    // TODO: test
    async withdrawFunds() {
        if (!this.isEtheremIsInstalled()) return;
        try {
            const contract = await this.getContract();
            const tx = await contract["hfWithdrawFunds"]();
            await this.listenForTxMine(tx, "withdraw funds");
        } catch (e) {
            const error = e as { message: string };
            this.errorHandler(error, "You have no funds to withdraw!");
        }
    }

    // #endregion

    // #region helpers
    async connect() {
        if (!this.isEtheremIsInstalled()) return;
        try {
            const accounts: string[] = (await window.ethereum.request({
                method: "eth_requestAccounts",
            })) as string[];
            if (accounts.length === 0) {
                this.#isConnected.next(false);
                this.#accounts.next([]);
                return;
            } else {
                this.#isConnected.next(true);
                this.#accounts.next(accounts as string[]);
            }
        } catch (error) {
            console.error(error);
            this.#isConnected.next(false);
            this.#accounts.next([]);
        }
    }

    async hotelExists(address: string) {
        if (!this.isEtheremIsInstalled()) return;
        try {
            const contract = await this.getContract();
            const exists = await contract["hotelExists"](address);
            this.#hotelExists.next(exists);
            this.cdr?.detectChanges();
            return exists;
        } catch (e) {
            this.#hotelExists.next(false);
            this.cdr?.detectChanges();
            return false;
        }
    }

    setHotelAddress(address: string) {
        this.#hotelAddress.next(address);
        this.getBalance();
    }
    // #endregion

    // #region private methods
    private isEtheremIsInstalled(): boolean {
        if (typeof window.ethereum === "undefined") {
            alert(
                "MetaMask is not installed! Please install it and try again.",
            );
            return false;
        }
        return true;
    }

    private errorHandler(
        error: unknown,
        messageIfReveted?: string,
        fallbackError?: string,
    ) {
        const err = error as { code: string; message: string };
        if (err.code === "ACTION_REJECTED") {
            alert("Transaction rejected!");
        } else if ((err.message as string).includes("execution reverted")) {
            alert(messageIfReveted ?? "Transaction reverted!");
        } else {
            alert(fallbackError ?? "Something went wrong!");
        }
    }

    private async listenForTxMine(
        tx: ethers.providers.TransactionResponse,
        txName: string = "tx",
    ) {
        const provider = new ethers.providers.Web3Provider(
            window.ethereum as unknown as ethers.providers.ExternalProvider,
        );
        console.log(`Mining ${txName}...`);
        return provider.once(tx.hash, (receipt) => {
            console.log("Tx mined!: ", receipt);
        });
    }

    private async getBalance() {
        if (!this.isEtheremIsInstalled()) return;
        if (
            this.#hotelAddress.value.toLowerCase() !==
            this.#accounts.value[0].toLowerCase()
        )
            return;
        const contract = await this.getContract();
        const balance = await contract["hfGetBalance"](
            this.#hotelAddress.value,
        );
        const balanceAsEther = ethers.utils
            .formatEther(BigNumber.from(balance.toString()).toString())
            .slice(0, 5);
        this.#balance.next(balanceAsEther);
        this.cdr?.detectChanges();
    }

    private async getContract() {
        const provider = new ethers.providers.Web3Provider(
            window.ethereum as unknown as ethers.providers.ExternalProvider,
        );
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        return contract;
    }
    // #endregion
}

