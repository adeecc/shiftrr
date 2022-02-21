import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from '../models/user'

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .exec()
        .then(results => {
            res.status(200).json({
                users: results,
                count: results.length
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: err
            })
        })
}

const createUser = (req: Request, res: Response, next: NextFunction) => {
    let { profilePicture, name, username, email, contactNumber, bio, credits } = req.body

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        profilePicture,
        name,
        username,
        email,
        contactNumber,
        bio,
        credits
    })

    return user.save()
        .then(
            result => {
                return res.status(201).json({
                    user: result
                })
            }
        )
        .catch(
            error => {
                return res.status(500).json({
                    message: error.message,
                    error: error
                })
            }
        )
}

export default { getAllUsers, createUser }