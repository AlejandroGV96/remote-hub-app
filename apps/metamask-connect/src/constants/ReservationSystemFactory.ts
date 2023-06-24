export const contractAddress = "0x0C173Ed499930D5cC501c1f17b3Fd1cc30A7ec3B";
export const abi = [
    {
        inputs: [],
        name: "AlreadyExists",
        type: "error",
    },
    {
        inputs: [],
        name: "NotOwner",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bool",
                name: "success",
                type: "bool",
            },
        ],
        name: "BalanceChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "guestAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "roomNumber",
                        type: "uint256",
                    },
                    {
                        internalType:
                            "enum ReservationSystemTypes.ReservationStatus",
                        name: "status",
                        type: "uint8",
                    },
                ],
                indexed: false,
                internalType: "struct ReservationSystemTypes.Reservation",
                name: "reservation",
                type: "tuple",
            },
        ],
        name: "ReservationAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bool",
                name: "success",
                type: "bool",
            },
        ],
        name: "ReservationsChanged",
        type: "event",
    },
    {
        inputs: [],
        name: "createNewHotel",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_price",
                type: "uint256",
            },
        ],
        name: "getReservationPrice",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "guestAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "roomNumber",
                        type: "uint256",
                    },
                    {
                        internalType:
                            "enum ReservationSystemTypes.ReservationStatus",
                        name: "status",
                        type: "uint8",
                    },
                ],
                internalType: "struct ReservationSystemTypes.Reservation",
                name: "_reservation",
                type: "tuple",
            },
        ],
        name: "hfAddReservation",
        outputs: [
            {
                internalType: "bool",
                name: "success",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_hotelAddress",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "address",
                        name: "guestAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "roomNumber",
                        type: "uint256",
                    },
                    {
                        internalType:
                            "enum ReservationSystemTypes.ReservationStatus",
                        name: "status",
                        type: "uint8",
                    },
                ],
                internalType: "struct ReservationSystemTypes.Reservation",
                name: "_reservation",
                type: "tuple",
            },
        ],
        name: "hfConfirmReservation",
        outputs: [
            {
                internalType: "bool",
                name: "success",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "guestAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "roomNumber",
                        type: "uint256",
                    },
                    {
                        internalType:
                            "enum ReservationSystemTypes.ReservationStatus",
                        name: "status",
                        type: "uint8",
                    },
                ],
                internalType: "struct ReservationSystemTypes.Reservation",
                name: "_reservation",
                type: "tuple",
            },
        ],
        name: "hfConsolidateReservation",
        outputs: [
            {
                internalType: "bool",
                name: "success",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_hotelAddress",
                type: "address",
            },
        ],
        name: "hfGetAllReservations",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "guestAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "roomNumber",
                        type: "uint256",
                    },
                    {
                        internalType:
                            "enum ReservationSystemTypes.ReservationStatus",
                        name: "status",
                        type: "uint8",
                    },
                ],
                internalType: "struct ReservationSystemTypes.Reservation[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_hotelAddress",
                type: "address",
            },
        ],
        name: "hfGetBalance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_hotelAddress",
                type: "address",
            },
        ],
        name: "hfGetMyReservations",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "guestAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "roomNumber",
                        type: "uint256",
                    },
                    {
                        internalType:
                            "enum ReservationSystemTypes.ReservationStatus",
                        name: "status",
                        type: "uint8",
                    },
                ],
                internalType: "struct ReservationSystemTypes.Reservation[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_hotelAddress",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "address",
                        name: "guestAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "roomNumber",
                        type: "uint256",
                    },
                    {
                        internalType:
                            "enum ReservationSystemTypes.ReservationStatus",
                        name: "status",
                        type: "uint8",
                    },
                ],
                internalType: "struct ReservationSystemTypes.Reservation",
                name: "_reservation",
                type: "tuple",
            },
        ],
        name: "hfMakeReservationAvailable",
        outputs: [
            {
                internalType: "bool",
                name: "success",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_hotelAddress",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "address",
                        name: "guestAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "roomNumber",
                        type: "uint256",
                    },
                    {
                        internalType:
                            "enum ReservationSystemTypes.ReservationStatus",
                        name: "status",
                        type: "uint8",
                    },
                ],
                internalType: "struct ReservationSystemTypes.Reservation",
                name: "_reservation",
                type: "tuple",
            },
        ],
        name: "hfReclaimRoom",
        outputs: [
            {
                internalType: "bool",
                name: "success",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_hotelAddress",
                type: "address",
            },
        ],
        name: "hfRemoveConsolidatedReservations",
        outputs: [
            {
                internalType: "bool",
                name: "success",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "guestAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "roomNumber",
                        type: "uint256",
                    },
                    {
                        internalType:
                            "enum ReservationSystemTypes.ReservationStatus",
                        name: "status",
                        type: "uint8",
                    },
                ],
                internalType: "struct ReservationSystemTypes.Reservation",
                name: "_reservation",
                type: "tuple",
            },
        ],
        name: "hfRemoveReservation",
        outputs: [
            {
                internalType: "bool",
                name: "success",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_hotelAddress",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "address",
                        name: "guestAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "startDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "roomNumber",
                        type: "uint256",
                    },
                    {
                        internalType:
                            "enum ReservationSystemTypes.ReservationStatus",
                        name: "status",
                        type: "uint8",
                    },
                ],
                internalType: "struct ReservationSystemTypes.Reservation",
                name: "_reservation",
                type: "tuple",
            },
        ],
        name: "hfReserveRoom",
        outputs: [
            {
                internalType: "bool",
                name: "success",
                type: "bool",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "hfWithdrawFunds",
        outputs: [
            {
                internalType: "bool",
                name: "success",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_hotelAddress",
                type: "address",
            },
        ],
        name: "hotelExists",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];

