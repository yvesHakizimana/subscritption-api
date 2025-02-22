import express from 'express';
import {PORT} from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionsRouter from "./routes/subscriptions.routes.js";
import connectToDatabase from "./database/mongodb.js";

const app = express();

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionsRouter)

app.listen(PORT, async () =>{
    console.log(`Subscriptions Tracker Api running on ${PORT}`);
    await connectToDatabase()
})

export default app;