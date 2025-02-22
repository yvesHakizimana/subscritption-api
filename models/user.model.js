import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name is required.' ],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        minLength: 5,
        maxLength: 255,
        lowercase: true,
        required: [true, 'User Email is required.'],
    },
    password: {
        type: String,
        required: [true, "User Password is required."],
        minLength: 6,
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User
