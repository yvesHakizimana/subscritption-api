import {aj} from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const desicion = await aj.protect(req, {requested: 1})

        if(desicion.isDenied()){
            if(desicion.reason.isRateLimit()) return res.status(429).json({error: "Rate limit exceeded"})
            if(desicion.reason.isBot()) return res.status(403).json({error: "Bot detected."})

            res.status(403).json({error: "Access Denied."})
        }

        next()
    } catch (error){
         console.log(`Arcjet middleware error: ${error}`);
         next(error);
    }
}

export default arcjetMiddleware;