import { ConnectOptions } from 'mongodb';
import mongoose from 'mongoose';

const connectDB = async ()=> {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB Connected');   
}
export { connectDB };