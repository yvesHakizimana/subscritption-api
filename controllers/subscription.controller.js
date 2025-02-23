import mongoose from "mongoose";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const subscriptions = await Subscription.create([{...req.body, user: req.user._id}], {session})

        await session.commitTransaction()
        await session.endSession()

        res.status(201).json({
            success: true,
            message: "New Subscription was created successfully.",
            data: subscriptions[0]
        })

    } catch (error){
        await session.abortTransaction()
        await session.endSession()
        next(error)
    }
}

export const getSubscriptionsByUser = async (req, res, next) => {
    try {
        if(req.user._id !== req.params.id){
            const error = new Error("Please view the subscriptions of the account you are onwer of.")
            error.statusCode = 401
            throw error
        }

        const subscriptions = await Subscription.find({user: req.params.id})
        res.status(200).json({
            success: true,
            data: subscriptions
        })

    } catch (error){
        next(error)
    }
}