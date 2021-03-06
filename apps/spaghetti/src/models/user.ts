import mongoose, { Schema } from 'mongoose';

import { IUser } from '@shiftrr/types/models';
import { userRole, userStatus } from '@shiftrr/types/models/user';

const SellerSchema: Schema = new Schema(
  {
    services: { type: [Schema.Types.ObjectId], ref: 'Service' },
    domain: { type: String },
    skills: { type: [String], default: [] },
    rating: { type: Number, default: 5, min: 0, max: 5, required: true },
    requests: { type: [Schema.Types.ObjectId], ref: 'Request' },
  },
  {
    timestamps: true,
  }
);

const BuyerSchema: Schema = new Schema(
  {
    rating: { type: Number, default: 5, min: 0, max: 5, required: true },
    requested: { type: [Schema.Types.ObjectId], ref: 'Request' },
  },
  {
    timestamps: true,
  }
);

const UserSchema: Schema = new Schema(
  {
    profilePicture: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    googleId: { required: true, type: String },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (email: string) => {
          return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          );
        },
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    contactNumber: { type: String },
    bio: { type: String, trim: true },
    credits: { type: Number, required: true, trim: true },
    status: {
      type: String,
      enum: [userStatus.active, userStatus.banned],
      default: userStatus.active,
      required: true,
    },
    role: {
      type: String,
      enum: [userRole.admin, userRole.user],
      default: userRole.user,
      required: true,
    },
    sellerProfile: { type: SellerSchema, required: true },
    buyerProfile: { type: BuyerSchema, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
