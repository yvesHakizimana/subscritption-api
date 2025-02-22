import {Router} from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send({title: "Getting all Users."});
})

userRouter.get('/:id', (req, res) => {
    res.send({title: "Get Single User Details."})
})

userRouter.post('/', (req, res) => {
    res.send({title: "Create User"});
})

userRouter.put('/:id', (req, res) => {
    res.send({title: "Update User details."});
})

userRouter.delete('/:id', (req, res) => {
    res.send({title: "Delete User"});
})