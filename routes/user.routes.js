import {Router} from 'express';
import {getAllUsers, getUser} from "../controllers/users.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getAllUsers)

userRouter.get('/:id', authorize,  getUser)

userRouter.post('/', (req, res) => {
    res.send({title: "Create User"});
})

userRouter.put('/:id', (req, res) => {
    res.send({title: "Update User details."});
})

userRouter.delete('/:id', (req, res) => {
    res.send({title: "Delete User"});
})

export default userRouter;