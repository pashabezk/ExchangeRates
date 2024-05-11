/** Describe type for currency query */
export type CurrencyResponse = {
	quotes: Record<string, number>;
	source: string;
	success: boolean;
	timestamp: number;
}
