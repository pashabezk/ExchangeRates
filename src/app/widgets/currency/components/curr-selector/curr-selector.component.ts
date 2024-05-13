import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewContainerRef} from "@angular/core";
import {CurrSelectorItemComponent} from "../curr-selector-item/curr-selector-item.component";

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
	isFirstClick: boolean = true;
	allCurrencies = ["USD", "EUR", "GBP", "CNY", "JPY", "TRY"];
	listenerFn = () => {};

	@Input() selectedCurrencies: string[] = [];
	@Output() onChangeCurrency = new EventEmitter<string>();
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

	change(currency: string) {
		this.onChangeCurrency.emit(currency);
	}
}
