import mongoose from "mongoose";
import { Document } from "mongoose";

export default interface IService extends Document {
    seller: mongoose.Types.ObjectId,
    name: string,
    description: string,
    startingPrice: number,
    rating: number
}