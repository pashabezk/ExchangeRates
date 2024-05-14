import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CurrencyCardComponent} from "../../features/currency-card/currency-card.component";
import {CurrencyService} from "./services/currency.service";
import {CurrencyResponse} from "./models/types";
import {CurrSelectorComponent} from "./components/curr-selector/curr-selector.component";
import {GlobalStorageService} from "../../storages/global-storage/global-storage.service";

// const mockExchangeRates = {
// 	quotes: {
// 		RUBUSD: 91.63,
// 		RUBEUR: 98.80,
// 		RUBGBP: 115.31,
// 	},
// 	source: "RUB",
// 	success: true,
// 	timestamp: 1715632258197,
// };
//
// const mockPrevExchangeRates = {
// 	quotes: {
// 		RUBUSD: 91.24,
// 		RUBEUR: 98.80,
// 		RUBGBP: 116.86,
// 	},
// 	source: "RUB",
// 	success: true,
// 	timestamp: 1715632242499,
// };

/**
 * Function that converts number to two digits format
 * @param n number
 * @example
 * twoDigits(3) // "03"
 * twoDigits(13) // "13"
 */
const twoDigits = (n: number): string => {
	return n < 10 ? "0" + n : n.toString();
};

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
export class CurrencyComponent implements OnInit, OnDestroy {
	private currenciesService = inject(CurrencyService);
	private intervalID: number | null = null;
	private lastUpdated: Date = new Date();

	isSelectorOpen: boolean = false;

	userCurrency = "RUB";
	selectedCurrencies: string[] = ["USD", "EUR", "GBP"];
	exchangeRate: CurrencyResponse | null = null;
	prevExchangeRate: CurrencyResponse | null = null;

	constructor(private globalStorageService: GlobalStorageService) {}

	ngOnInit() {
		this.loadExchangeRates();
		this.globalStorageService.API_KEY.subscribe(()=> {
			this.reSetInterval();
		});
	}

	ngOnDestroy() {
		this.clearInterval();
	}

	/** Method to change currencies selector visibility */
	openCloseSelector() {
		this.isSelectorOpen = !this.isSelectorOpen;
	}

	/**
	 * Method to add or remove currency from show list
	 * @param currency
	 */
	addOrRemoveCurrencyFromVisibleList(currency: string) {
		if (this.selectedCurrencies.includes(currency)) {
			this.selectedCurrencies = this.selectedCurrencies.filter((c) => c !== currency);
		} else {
			this.selectedCurrencies.push(currency);
		}
	}

	/**
	 * Method to load exchange rates from server
	 */
	loadExchangeRates() {
		this.currenciesService.getCurrencies(this.selectedCurrencies.join(","), this.userCurrency).subscribe({
			next: (data) => {
				this.prevExchangeRate = this.exchangeRate;
				this.exchangeRate = data;
				this.lastUpdated = new Date();
			},
			error: (e) => {
				console.error(e);
				this.lastUpdated = new Date();
				this.globalStorageService.setApiTokenError("Ошибка, не удалось выполнить запрос");
				this.clearInterval();
			},
		});
		this.reSetInterval();
	}

	/** Method to clear interval that subscribes to currency updates */
	clearInterval() {
		if (this.intervalID) {
			window.clearInterval(this.intervalID);
		}
	}

	/** Method to set interval that will update currencies every 5 seconds */
	reSetInterval() {
		this.clearInterval();
		this.intervalID = window.setInterval(() => {
			this.loadExchangeRates();
		}, 5000);
	}

	/**
	 * Method to get time of last update
	 * @return date + time in format `dd.mm.yyyy, hh:mm.ss`
	 */
	getLastUpdatedTime(): string {
		if (!this.exchangeRate) {
			return "";
		}

		// time from timestamp is strange, so time will be taken from query result time
		// const date = new Date(this.exchangeRate.timestamp);
		const date = this.lastUpdated;
		return twoDigits(date.getDate()) + "." + twoDigits(date.getMonth()) + "." + date.getFullYear() + ", "
			+ twoDigits(date.getHours()) + ":" + twoDigits(date.getMinutes()) + "." + twoDigits(date.getSeconds());
	}

	/**
	 * Method to get current exchange rate for currency
	 * @param currency
	 * @return exchange rate
	 */
	getExchangeRate(currency: string = "USD"): number {
		if (!this.exchangeRate) {
			return NaN;
		}
		return 1 / this.exchangeRate.quotes[this.userCurrency + currency];
	}

	/**
	 * Method to get exchange rate difference for currency
	 * @param currency currency that should be compared
	 * @return rate difference between last value and current
	 */
	getExchangeRateDifference(currency: string = "USD"): number {
		if (!this.exchangeRate || !this.prevExchangeRate) {
			return 0;
		}

		const quoteName = this.userCurrency + currency;
		const current = 1 / this.exchangeRate.quotes[quoteName];
		const previous = 1 / this.prevExchangeRate.quotes[quoteName];
		if (!previous || !current) {
			return 0;
		}
		return current - previous;
	}
}
