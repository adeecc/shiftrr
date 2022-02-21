import { Document } from "mongoose";

export default interface IUser extends Document {
    profilePicture: string,
    name: string,
    username: string,
    email: string,
    contactNumber: number,
    bio: string,
    credits: string
}