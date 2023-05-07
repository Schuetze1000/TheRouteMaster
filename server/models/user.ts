import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto';;
import {  Schema, model, Document } from 'mongoose';

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: [true, "Can't be blank"],
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [8, "Please use minimum of 8 characters"]
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Can't be blank"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Use a valid email-address'],
        unique: true,
        index: true
    },
    profile: {
        firstname: String,
        lastname: String,
        avatar: String,
        homeaddress: {
            number: String,
            street: String,
            zip: String,
            city: String,
            state: String,
            country: String
        },
    },
    resetPasswordToken: String,
    resetPasswordExpire: String,
    active: {
        type: Boolean, 
        default: true
    }
});

export interface IUser extends Document {
    getResetPasswordToken(): string;
    getSignedToken(): string;
    matchPassword(password: string): boolean | PromiseLike<boolean>;
    resetPasswordToken: string|undefined;
    resetPasswordExpire: string|undefined;
    username: string;
    password: string;
    email: string;  
    profile: {
        firstname: String,
        lastname: String,
        avatar: String,
        homeaddress: {
            number: String,
            street: String,
            zip: String,
            city: String,
            state: String,
            country: String
        }
    };
    active: true;
}

UserSchema.pre<IUser>("save", async function (next:any) {
    if (!this.isModified('password')) {
        return next();
    } 
    const salt = bycrypt.genSaltSync(10);
    this.password = bycrypt.hashSync(this.password, salt);
    next();
});

UserSchema.methods.matchPassword= async function (password:string) {
    return await bycrypt.compare(password,this.password)   
}

UserSchema.methods.getResetPasswordToken= function () {
    const resetToken= crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken= crypto.createHash('sha256').update(resetToken).digest('hex');  
    this.resetPasswordExpire = Date.now() + 10*(60*1000) 
    return resetToken

}

UserSchema.methods.getSignedToken= function (password:string) {
    return jwt.sign({id:this._id},process.env.JWT_SECRET!,{
        expiresIn:process.env.JWT_EXPIRE
    })   
}

const User = model<IUser>("User", UserSchema);
export default User
