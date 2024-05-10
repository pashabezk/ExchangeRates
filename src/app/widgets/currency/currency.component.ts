import {Component} from '@angular/core';
import {CurrencyCardComponent} from "../../features/currency-card/currency-card.component";

@Component({
	selector: 'app-currency',
	standalone: true,
	imports: [
		CurrencyCardComponent
	],
	templateUrl: './currency.component.html',
	styleUrl: './currency.component.css'
})
export class CurrencyComponent {
}
