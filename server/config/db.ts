import { ConnectOptions } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const path = require('path');

dotenv.config({path: path.resolve( __dirname,"..",".env")});

const connectDB = async ()=> {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB Connected');   
}
export {connectDB};