import {Router} from 'express'
import {createSubscription, getSubscriptionsByUser} from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionsRouter = Router()


subscriptionsRouter.get('/', (req, res) => {
    res.send({title: "Getting all subscriptions."})
})

subscriptionsRouter.get("/:id", (req, res) => {
    res.send({title: "Getting single details of the subscription By Id."})
})

subscriptionsRouter.post('/', authorize, createSubscription)

subscriptionsRouter.put('/:id', (req, res) => {
    res.send({title: "Updating the subscription By Id."})
})

subscriptionsRouter.delete('/:id', (req, res) => {
    res.send({title: "Deleting the subscription By Id."})
})

subscriptionsRouter.get('/user/:id', authorize, getSubscriptionsByUser)

subscriptionsRouter.get('/:id/cancel', (req, res) => {
    res.send({title: "Canceling the subscription"})
})


subscriptionsRouter.get('/upcoming-renewals', (req, res) => {
    res.send({title: "Upcoming renewals"})
})

export default subscriptionsRouter
