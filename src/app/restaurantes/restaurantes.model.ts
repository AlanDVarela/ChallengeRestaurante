import mongoose, { Schema, model, Document, Types } from 'mongoose';
import { StatusType } from '../varTypes';

export interface IRestaurante {
    _id?: Types.ObjectId;
    name: string;
    location: string;
    kitchen: string;
}

const RestauranteSchema = new Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        kitchen: { type: String, required: true },
    },
    { timestamps: true }
);

const Restaurante = model<IRestaurante & Document>('Restaurante', RestauranteSchema);

export default Restaurante;