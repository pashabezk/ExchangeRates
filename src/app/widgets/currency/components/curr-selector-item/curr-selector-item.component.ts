import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
	selector: 'app-curr-selector-item',
	standalone: true,
	imports: [],
	templateUrl: './curr-selector-item.component.html',
	styleUrl: './curr-selector-item.component.css'
})
export class CurrSelectorItemComponent {
	/** Displayed currency name */
	@Input() currencyShortName: string = "USD";
	/** Is currency selected or not */
	@Input() selected: boolean = false;
	/** Callback for checkbox with currency change state */
	@Output() onChange = new EventEmitter<string>();

	/** Handler for checkbox change state */
	changeHandler() {
		this.onChange.emit(this.currencyShortName);
	}
}
