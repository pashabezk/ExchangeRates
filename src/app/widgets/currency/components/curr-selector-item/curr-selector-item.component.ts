import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
	selector: 'app-curr-selector-item',
	standalone: true,
	imports: [],
	templateUrl: './curr-selector-item.component.html',
	styleUrl: './curr-selector-item.component.css'
})
export class CurrSelectorItemComponent {
	@Input() currencyShortName: string = "USD";
	@Input() selected: boolean = false;
	@Output() onChange = new EventEmitter<string>();

	changeHandler() {
		this.onChange.emit(this.currencyShortName);
	}
}
