import {  Schema, model, Document } from 'mongoose';

const ICS_DataSchema: Schema = new Schema({

});

export interface IICS_Data extends Document {

}

const  ICS_Data = model<IICS_Data>("User", ICS_DataSchema);
export default ICS_Data
