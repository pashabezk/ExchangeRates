import {Component, inject, OnInit} from '@angular/core';
import {CurrencyCardComponent} from "../../features/currency-card/currency-card.component";
import {CurrencyService} from "./services/currency.service";

@Component({
	selector: 'app-currency',
	standalone: true,
	imports: [
		CurrencyCardComponent
	],
	templateUrl: './currency.component.html',
	styleUrl: './currency.component.css'
})
export class CurrencyComponent implements OnInit {
	private currenciesService = inject(CurrencyService);

	ngOnInit() {
		// this.getCurrencies();
	}

	getCurrencies() {
		this.currenciesService.getCurrencies("USD").subscribe({
			next: (data) => {
				// this.taskList = data;
				console.log(data);
			},
			error: (e) => {
				console.log(e);
			},
		});
	}
}
