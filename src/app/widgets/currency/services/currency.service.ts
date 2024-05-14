import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CurrencyResponse} from "../models/types";
import {environment} from "../../../../environments/environment";
import {GlobalStorageService} from "../../../storages/global-storage/global-storage.service";

/** Service that stores currencies API methods */
@Injectable({
	providedIn: 'root'
})
export class CurrencyService {
	private http = inject(HttpClient);
	private apiKey = environment.API_KEY;

	constructor(private globalStorageService: GlobalStorageService) {
		globalStorageService.API_KEY.subscribe((data) => {
			this.apiKey = data;
		});
	}

	/**
	 * Method to load currencies from server
	 * @param currencies currencies list that should be received. Currencies should be comma separated without spaces
	 * @param source user currency name
	 * @example getCurrencies("USD,EUR", "RUB")
	 */
	getCurrencies(currencies: string, source: string = "RUB"): Observable<CurrencyResponse> {
		return this.http.get<CurrencyResponse>(environment.API_URL, {
			headers: {
				apikey: this.apiKey,
			},
			params: {
				source: source,
				currencies: currencies,
			}
		});
	}
}
