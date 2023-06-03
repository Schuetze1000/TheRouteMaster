import { ConnectOptions } from 'mongodb';
import mongoose from 'mongoose';

const connectDB = async ()=> {
    await mongoose.connect("mongodb://192.168.178.34/");
    console.log('MongoDB Connected');   
}
export { connectDB };