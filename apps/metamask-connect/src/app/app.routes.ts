import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Route } from "@angular/router";

@Component({
    selector: "web3-root",
    template: ``,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmptyComponent {}

export const appRoutes: Route[] = [
    {
        path: "",
        component: EmptyComponent,
    },
    {
        path: "add-reservation",
        loadComponent: () =>
            import("./screens/add-reservation/add-reservation.component").then(
                (m) => m.AddReservationComponent,
            ),
    },
    {
        path: "all-reservations",
        loadComponent: () =>
            import(
                "./screens/all-reservations/all-reservations.component"
            ).then((m) => m.AllReservationsComponent),
    },
    {
        path: "my-reservations",
        loadComponent: () =>
            import("./screens/my-reservations/my-reservations.component").then(
                (m) => m.MyReservationsComponent,
            ),
    },
    {
        path: "**",
        redirectTo: "",
    },
];

