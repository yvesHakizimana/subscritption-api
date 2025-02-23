import mongoose from 'mongoose'
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const {name, email, password} = req.body


        const existingUser = await User.findOne({ email })

        if(existingUser) {
            const error = new Error('User already exists')
            error.statusCode = 409
            throw error
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{name, email, password: hashedPassword}], { session })

        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction()
        await session.endSession()
        res.status(201).json({
            success: true,
            message: 'User successfully created!',
            data: {
                token,
                user: newUsers[0]
            }
        })
    } catch (error){
        await session.abortTransaction()
        await session.endSession()
        next(error)
    }
}

export const signIn = async (req, res, next) => {
    try {

        const {email, password} = req.body

        const foundUser = await User.findOne({email})

        if(!foundUser) {
            const error = new Error("Invalid email or password")
            error.statusCode = 400
            throw error
        }

        const passwordMatch = await bcrypt.compare(password, foundUser.password)

        if(!passwordMatch) {
            const error = new Error("Invalid email or password")
            error.statusCode = 400
            throw error
        }

        // Generate the token.
        const token = await jwt.sign({userId: foundUser._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success: true,
            message: 'User successfully logged in!',
            data: {
                token,
                user: foundUser
            }
        })
    } catch (error){
        next(error)
    }
}

export const signOut = async (req, res, next) => {
    try {

    } catch (error){
        console.log(error)
    }
}