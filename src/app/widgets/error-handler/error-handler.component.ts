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
	newToken: string = "";

	constructor(private globalStorageService: GlobalStorageService) {}

	onConfirm() {
		this.globalStorageService.setApiKey(this.newToken);
		this.globalStorageService.setApiTokenError();
	}
}
