import {Component, inject, OnInit} from '@angular/core';
import {CurrencyCardComponent} from "../../features/currency-card/currency-card.component";
import {CurrencyService} from "./services/currency.service";
import {CurrencyResponse} from "./models/types";
import {CurrSelectorComponent} from "./components/curr-selector/curr-selector.component";

@Component({
	selector: 'app-currency',
	standalone: true,
	imports: [
		CurrencyCardComponent,
		CurrSelectorComponent
	],
	templateUrl: './currency.component.html',
	styleUrl: './currency.component.css'
})
export class CurrencyComponent implements OnInit {
	private currenciesService = inject(CurrencyService);

	isSelectorOpen: boolean = false;

	userCurrency = "RUB";
	selectedCurrencies: string[] = ["USD", "EUR", "GBP"];
	exchangeRate: CurrencyResponse | null = null;
	prevExchangeRate: CurrencyResponse | null = null;

	ngOnInit() {
		// this.getCurrencies();
	}

	openCloseSelector() {
		this.isSelectorOpen = !this.isSelectorOpen;
	}

	changeCurrency(currency: string) {
		if (this.selectedCurrencies.includes(currency)) {
			this.selectedCurrencies = this.selectedCurrencies.filter((c) => c !== currency);
		} else {
			this.selectedCurrencies.push(currency);
		}
	}

	getCurrencies() {
		this.currenciesService.getCurrencies(this.selectedCurrencies.join(","), this.userCurrency).subscribe({
			next: (data) => {
				this.prevExchangeRate = this.exchangeRate;
				this.exchangeRate = data;
				console.log(data);
			},
			error: (e) => {
				console.error(e);
			},
		});
	}
}
