import { IUser } from './user';

export interface ProfileStructure {
	firstname: string;
	surname: string;
	avatar: string;
	homeaddress: HomeaddressStructure;
}

export interface HomeaddressStructure {
	number: string;
	street: string;
	zip: string;
	city: string;
	state: string;
	country: string;
}

export interface UserStructure {
	username: string;
	email: string;
	ics_uid:string;
	profile: ProfileStructure;
}

export interface ConfigTrainStructure {
	maxRoutes: number;
	timeOffset: number;
	homeTrainStationID: number;
	workTrainStationID: number;
	active: boolean;
}