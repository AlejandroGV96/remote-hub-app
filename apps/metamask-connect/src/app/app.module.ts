import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routes";
import { Web3Service } from "./web3.service";
import { NavBarComponent, TextboxComponent } from "@web3/elements";
import { ReservationListComponent } from "./components/reservations-list/reservation-list.component";
import { ReservationFormComponent } from "./components/reservation-form/reservation-form.component";

@NgModule({
    declarations: [AppComponent],
    imports: [
        ReservationFormComponent,
        ReservationListComponent,
        BrowserModule,
        TextboxComponent,
        NavBarComponent,
        RouterModule.forRoot(appRoutes, {
            initialNavigation: "enabledBlocking",
        }),
    ],
    providers: [Web3Service],
    bootstrap: [AppComponent],
})
export class AppModule {}

