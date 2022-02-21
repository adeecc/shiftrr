import mongoose from "mongoose";
import { Schema } from "mongoose";
import IUser from "src/interfaces/user";

const UserSchema: Schema = new Schema({
    profilePicture: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    email: {
        type: String, required: true, trim: true, validate: {
            validator: (email: string) => { return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) },
            message: props => `${props.value} is not a valid email address.`
        }
    },
    contactNumber: { type: Number, required: true },
    bio: { type: String, required: true, trim: true },
    credits: { type: String, required: true, trim: true }
}, {
    timestamps: true
})

export default mongoose.model<IUser>("User", UserSchema);