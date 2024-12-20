export interface Currency {
	id: string;
	icon: string;
	name: string;
	symbol: string;
	rank: number;
	price: number;
	priceBtc: number;
	volume: number;
	marketCap: number;
	availableSupply: number;
	totalSupply: number;
	fullyDilutedValuation: number;
	liquidityScore: number;
	volatilityScore: number;
	marketCapScore: number;
	riskScore: number;
	avgChange: number;
	priceChange1h: number;
	priceChange1d: number;
	priceChange1w: number;
	redditUrl: string;
	twitterUrl: string;
	explorers: string[];
}