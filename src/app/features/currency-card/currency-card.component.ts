import {Component, Input} from '@angular/core';

@Component({
	selector: 'app-currency-card',
	standalone: true,
	templateUrl: './currency-card.component.html',
	styleUrl: './currency-card.component.css'
})
export class CurrencyCardComponent {
	@Input() currencyShortName: string = "USD";
	@Input() rate: number = NaN;
	@Input() rateDifference: number = 0;
	protected readonly isNaN = isNaN;
}
