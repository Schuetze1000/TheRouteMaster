export interface IDBRoutes {
	arrival: String;
	plannedArrival: String;
	arivalDelay: Number;
	route: ISwitch[];
	price: IPrice;
}

export interface IPrice {
	amount: Number;
	currency: String;
}

export interface ISwitch {
	index: Number;
	walk: Boolean;
	types: ITrain | IFoot;
}

export interface ITrain {
	name: String;
	idNr: String;
	types: String;

	direction: String;
	from: String;
	fromLocation: IPosition;
	to: String;
	toLocation: IPosition;
	departure: String;
	plannedDeparture: String;
	departureDelay: String;
	plannedArrival: String;
	arrival: String;
	arivalDelay: Number;
}

export interface IFoot {
	from: String;
	fromLocation: IPosition;
	to: String;
	toLocation: IPosition;
	distance: Number;
	walkTime: Number;

	plannedArrival?: "";
	arrival?: "";
	arivalDelay?: 0;
}

export interface IPosition {
	latitude: Number;
	longitude: Number;
}