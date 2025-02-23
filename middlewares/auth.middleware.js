import {JWT_SECRET} from "../config/env.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            const token = req.headers.authorization.split(' ')[1]

            if(!token) return res.status(401).send({success: false, message: 'Unauthorized'});

            const decoded = jwt.verify(token, JWT_SECRET)

            const user  = await User.findById(decoded.userId).select('-password')

            if(!user) return res.status(401).send({success: false, message: 'Unauthorized'});

            req.user = user

            next()
        }
    } catch (error){
        res.status(401).json({message: 'Unauthorized', error:error.message});
    }
}

export default authorize;