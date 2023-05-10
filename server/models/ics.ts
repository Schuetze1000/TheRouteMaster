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
		unique: true,
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
});

export interface IICS_Data extends Document {
	setIcsData(): boolean;
	uid: number;
	name: string;
	hash: string | undefined;
	data: string | undefined;
}

ICS_DataSchema.methods.setIcsData = function (ics_data: string) {
	this.hash = crypto.createHash("sha1").update(ics_data).digest("base64");
	this.ics = ics_data;
	return true;
};

const ICS_Data = model<IICS_Data>("User", ICS_DataSchema);
export default ICS_Data;
