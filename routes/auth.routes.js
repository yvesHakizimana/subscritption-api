import {Router} from 'express';

const authRouter = Router();

authRouter.post('/sign-in', (req, res) => {
    res.send({title: "Sign-in api."})
})

authRouter.post('/register', (req, res) => {
    res.send({title: "Register api"})
})

authRouter.post('/sign-out', (req,res) => {
    res.send({title: "Sign-out api"})
})

export default authRouter;