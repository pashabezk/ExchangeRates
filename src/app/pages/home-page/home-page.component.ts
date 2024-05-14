import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {CurrencyComponent} from "../../widgets/currency/currency.component";
import {GlobalStorageService} from "../../storages/global-storage/global-storage.service";
import {ErrorHandlerComponent} from "../../widgets/error-handler/error-handler.component";
import {Subscription} from "rxjs";

/** Component represents home page */
@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [
		NgOptimizedImage,
		CurrencyComponent,
		ErrorHandlerComponent
	],
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {
	subscription!: Subscription;
	tokenError: string | null = null;

	constructor(private globalStorageService: GlobalStorageService) {}

	ngOnInit() {
		this.subscription = this.globalStorageService.apiTokenError.subscribe((data) => {
			this.tokenError = data;
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
