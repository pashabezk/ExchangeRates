import {Component, Input} from '@angular/core';

@Component({
	selector: 'app-currency-card',
	standalone: true,
	templateUrl: './currency-card.component.html',
	styleUrl: './currency-card.component.css'
})
export class CurrencyCardComponent {
	@Input() currencyName: string = "";
	currencyShortName: string = "USD";
	rate: number = 60.42;
	rateDifference: number = 4.54;
}
