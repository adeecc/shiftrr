import mongoose from "mongoose";
import { Document } from "mongoose";

export default interface IBuyer extends Document {
    rating: number,
    requested: [mongoose.Types.ObjectId],
}