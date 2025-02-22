import mongoose from "mongoose";

// As you see it's possible that we can have the property level validation to mean we can validate the like what type we can enter in our database and if not it will raise some errors.
const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required."],
        trim: true,
        minLength: 5,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required."],
        min: [0, "Price must be a positive integer."]
    },
    currency: {
        type: String,
        enum: ["EUR", "USD", "GBP"],
        default: "USD"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ["sports", "news", "entertainment", "lifestyle", "technology", "finance", "politics", "other"],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start Date must be in the past."
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) { return value > this.startDate },
            message: "RenewalDate must be after the start Date."
        }
    }


}, { timestamps: true });

// Like this will the pre actions that will run before saving the data.
subscriptionSchema.pre("save", function (next) {
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

        this.renewalDate = new Date(this.startDate)
        this.renewalDate = new Date(this.renewalDate.getDate() + renewalPeriods[this.frequency])
    }

    // Auto update the status if the renewalDate has passed.
    if(this.renewalDate < new Date()){
        this.status = "expired";
    }

    next()
})

const Subscription = mongoose.model("Subscription", subscriptionSchema)

export default Subscription