import express from 'express';
import {PORT} from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionsRouter from "./routes/subscriptions.routes.js";
import connectToDatabase from "./database/mongodb.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflows.routes.js";

const app = express();

// Middleware Section
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Security and Rate-limiting protection.
app.use(arcjetMiddleware)

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionsRouter)
app.use('/api/v1/workflows', workflowRouter)

app.use(errorMiddleware)

app.listen(PORT, async () =>{
    console.log(`Subscriptions Tracker Api running on ${PORT}`);
    await connectToDatabase()
})

export default app;