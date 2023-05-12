import { Schema, model, Document } from "mongoose";
import crypto from "crypto";

const ICS_DataSchema: Schema = new Schema({
	uid: {
		type: Number,
		required: true,
		unique: true,
		index: true,
	},
	name: {
		type: String,
		required: true,
	},
	hash: {
		type: String,
		required: false,
	},
	data: {
		type: String,
		required: false,
	},
    active: {
		type: Boolean,
		default: false,
	},
});

export interface IICS_Data extends Document {
	UpdateIcsData(ics_data: string): boolean;
	matchHash(ics_match: string): boolean;
	uid: number;
	name: string;
	hash: string | undefined;
	data: string | undefined;
    active: boolean;
}

ICS_DataSchema.pre<IICS_Data>("save", async function (next: any) {
	if (!this.isModified("data")) {
		return next();
	}
    this.hash = crypto.createHash("sha1").update(this.data).digest("base64");
	next();
});

ICS_DataSchema.methods.UpdateIcsData = function (ics_data: string) {
	this.hash = crypto.createHash("sha1").update(ics_data).digest("base64");
	this.ics = ics_data;
	return true;
};

ICS_DataSchema.methods.matchHash = function(ics_match: string) {
	return this.hash == crypto.createHash("sha1").update(ics_match).digest("base64");
}

const ICS_Data = model<IICS_Data>("ICS", ICS_DataSchema);
export default ICS_Data;
