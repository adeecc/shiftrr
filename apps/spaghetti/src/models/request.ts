import mongoose from "mongoose";
import { Schema } from "mongoose";
import { IRequest } from "@shiftrr/types/models";

const RequestsSchema: Schema = new Schema({
    service: { type: Schema.Types.ObjectId, ref: "Services" },
    seller: { type: Schema.Types.ObjectId, ref: "Users" },
    buyer: { type: Schema.Types.ObjectId, ref: "Users" },
    price: { type: Number, required: true },
    status: { type: Number, required: true }
}, {
    timestamps: true
})

export default mongoose.model<IRequest>("Requests", RequestsSchema);