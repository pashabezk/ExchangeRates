import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {GlobalStorageService} from "../../storages/global-storage/global-storage.service";

@Component({
	selector: 'app-error-handler',
	standalone: true,
	imports: [
		FormsModule
	],
	templateUrl: './error-handler.component.html',
	styleUrl: './error-handler.component.css'
})
export class ErrorHandlerComponent {
	/** Var with new token. Var associated with input field */
	newToken: string = "";

	constructor(private globalStorageService: GlobalStorageService) {}

	/**
	 * Method that calls on OK button click.
	 * Write new api token to storage and clears error state
	 */
	onConfirm() {
		this.globalStorageService.setApiKey(this.newToken);
		this.globalStorageService.setApiTokenError();
	}
}
