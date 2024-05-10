import {Component, Input} from '@angular/core';

@Component({
	selector: 'app-currency-card',
	standalone: true,
	imports: [],
	templateUrl: './currency-card.component.html',
	styleUrl: './currency-card.component.css'
})
export class CurrencyCardComponent {
	@Input() currencyName: string = "";
}
