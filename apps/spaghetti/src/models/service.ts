import mongoose, { Schema } from 'mongoose';

import { IService } from '@shiftrr/types/models';

const ServiceSchema: Schema = new Schema(
  {
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    name: { type: String, required: false, trim: true },
    description: { type: String, required: false, trim: true },
    startingPrice: { type: Number, required: false },
    rating: { type: Number, default: 10, min: 0, max: 10, required: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IService>('Service', ServiceSchema);
