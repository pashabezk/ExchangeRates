import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CurrencyResponse} from "../models/types";
import {environment} from "../../../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class CurrencyService {
	private http = inject(HttpClient);

	getCurrencies(currencies: string, source: string = "RUB"): Observable<CurrencyResponse> {
		return this.http.get<CurrencyResponse>(environment.API_URL, {
			headers: {
				apikey: environment.API_KEY,
			},
			params: {
				source: source,
				currencies: currencies,
			}
		});
	}
}
