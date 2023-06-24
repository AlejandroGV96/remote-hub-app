import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider;
    }
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));

