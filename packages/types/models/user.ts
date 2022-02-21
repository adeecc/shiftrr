import { Document } from "mongoose";
import IBuyer from "./buyer";
import ISeller from "./selller";

export default interface IUser extends Document {
    profilePicture: string,
    name: string,
    username: string,
    email: string,
    contactNumber: number,
    bio: string,
    credits: string,
    sellerProfile: ISeller,
    buyerProfile: IBuyer
}