import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewContainerRef} from "@angular/core";
import {CurrSelectorItemComponent} from "../curr-selector-item/curr-selector-item.component";

/** Component represents selector for available currencies */
@Component({
	selector: "app-curr-selector",
	standalone: true,
	imports: [
		CurrSelectorItemComponent
	],
	templateUrl: "./curr-selector.component.html",
	styleUrl: "./curr-selector.component.css"
})
export class CurrSelectorComponent implements OnInit, OnDestroy {
	/** Flag that needs for correct work of outside click */
	private isFirstClick: boolean = true;

	/** All available currencies */
	allCurrencies = ["USD", "EUR", "GBP", "CNY", "JPY", "TRY"];

	/** Listener for outside click */
	listenerFn = () => {};

	/** Array of selected currencies */
	@Input() selectedCurrencies: string[] = [];
	/** Callback for checkbox with currency change state */
	@Output() onChangeCurrency = new EventEmitter<string>();
	/** Callback for component outside click */
	@Output() onOutsideClick = new EventEmitter<void>();

	constructor(private renderer: Renderer2, private readonly viewRef: ViewContainerRef) { }

	ngOnInit() {
		// add on click outside listener
		this.listenerFn = this.renderer.listen("window", "click", (e: Event) => {
			if (!this.viewRef.element.nativeElement.contains(e.target)) {
				if (this.isFirstClick) {
					this.isFirstClick = false;
				} else {
					this.onOutsideClick.emit();
				}
			}
		});
	}

	ngOnDestroy() {
		this.listenerFn();
	}

	/** Handler for checkboxes change state */
	change(currency: string) {
		this.onChangeCurrency.emit(currency);
	}
}
