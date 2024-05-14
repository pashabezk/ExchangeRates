import {Component, Input} from '@angular/core';

/**
 * Component represents card with currency rate
 */
@Component({
	selector: 'app-currency-card',
	standalone: true,
	templateUrl: './currency-card.component.html',
	styleUrl: './currency-card.component.css'
})
export class CurrencyCardComponent {
	/** Displayed currency name */
	@Input() currencyShortName: string = "USD";

	/** Current currency rate */
	@Input() rate: number = NaN;

	/** Difference between previous rate and current */
	@Input() rateDifference: number = 0;

	protected readonly isNaN = isNaN;
}
