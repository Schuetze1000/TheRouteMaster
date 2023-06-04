import { Schema, model, Document } from "mongoose";
import { IDBRoutes, IPosition } from "models/deutschebahnInterfaces";
import objHash from "object-hash";

const DeutscheBahnRoutesSchema: Schema = new Schema({
	routeId: {
		type: String,
		required: [true, "Can't be blank"],
		unique: true,
	},
	fromID: {
		type: Number,
		required: [true, "Can't be blank"],
	},
	from: {
		type: String,
	},
	fromLocation: {
		latitude: {
			type: Number,
		},
		longitude: {
			type: Number,
		},
	},
	toID: {
		type: Number,
		required: [true, "Can't be blank"],
	},
	to: {
		type: String,
	},
	toLocation: {
		latitude: {
			type: Number,
		},
		longitude: {
			type: Number,
		},
	},
	routes: {
		type: [],
	},
	routesHash: {
		type: String,
	},
	wasUpated: {
		type:Boolean,
	}
});

export interface IDeutscheBahnRoutes extends Document {
	matchHash(routes: string): boolean | PromiseLike<boolean>;
	routeId: String;
	fromID: Number;
	from: String;
	fromLocation: IPosition;
	toID: Number;
	to: String;
	toLocation: IPosition;
	routes: IDBRoutes[];
	routesHash: String;
	wasUpated: Boolean;
}

DeutscheBahnRoutesSchema.pre<IDeutscheBahnRoutes>("save", async function (next: any) {
	if (!this.isModified("routes")) {
		return next();
	}
	this.routesHash = objHash(this.routes);
	next();
});

DeutscheBahnRoutesSchema.methods.matchHash = async function (routes: string) {
	return (await objHash(routes)) == this.routesHash;
};

const DeutscheBahnRoutes = model<IDeutscheBahnRoutes>("DeutscheBahn", DeutscheBahnRoutesSchema);
export default DeutscheBahnRoutes;
