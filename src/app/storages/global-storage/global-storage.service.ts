import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";

/**
 * Class that stores global data, used in project
 */
@Injectable({
	providedIn: 'root'
})
export class GlobalStorageService {
	private _API_KEY = new BehaviorSubject<string>(environment.API_KEY);
	/** Api key for sending queries to server */
	API_KEY = this._API_KEY.asObservable();

	private _apiTokenError = new BehaviorSubject<any>(null);
	/** variable to store the error that occurs when sending a request */
	apiTokenError = this._apiTokenError.asObservable();

	/**
	 * Method to set api key
	 * @param apiKey
	 */
	setApiKey(apiKey: string) {
		this._API_KEY.next(apiKey);
	}

	/**
	 * Method to set token error
	 * @param error error message or null if need to clear error
	 */
	setApiTokenError(error: string | null = null) {
		this._apiTokenError.next(error);
	}
}
