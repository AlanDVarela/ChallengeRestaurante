import mongoose, { Schema, model, Document, Types } from 'mongoose';
import { UserType } from '../varTypes';

export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    emailVerified: boolean;
}

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        emailVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const User = model<IUser & Document>('User', UserSchema);

export default User;