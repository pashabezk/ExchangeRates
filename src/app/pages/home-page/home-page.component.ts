import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {CurrencyComponent} from "../../widgets/currency/currency.component";

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [
		NgOptimizedImage,
		CurrencyComponent
	],
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.css'
})
export class HomePageComponent {
}
