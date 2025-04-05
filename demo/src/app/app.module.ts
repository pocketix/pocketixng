import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MoreComponent} from './components/more/more.component';
import {AccordionModule} from "primeng/accordion";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {PocketixVpModule} from "../../../packages/pocketixng/src/lib/pocketix-vp.module";
import {ApiModule} from "./generated/api.module";
import {FormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        MoreComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AccordionModule,
        ButtonModule,
        DialogModule,
        HttpClientModule,
        DropdownModule,
        PocketixVpModule,
        ApiModule.forRoot((() => {
            const fullUrl = window.location.href;
            const url = new URL(fullUrl);
            const base = (url.port !== '80' && url.port !== '443')
                ? `${url.protocol}//${url.hostname}:4200`
                : `${url.protocol}//${url.hostname}/api`;

            return {rootUrl: base}
        })()),
        FormsModule,
        ToastModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
