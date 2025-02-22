import {Router} from 'express'

const subscriptionsRouter = Router()


subscriptionsRouter.get('/', (req, res) => {
    res.send({title: "Getting all subscriptions."})
})

subscriptionsRouter.get("/:id", (req, res) => {
    res.send({title: "Getting single details of the subscription By Id."})
})

subscriptionsRouter.post('/', (req, res) => {
    res.send({title: "Creating a new subscription"})
})

subscriptionsRouter.put('/:id', (req, res) => {
    res.send({title: "Updating the subscription By Id."})
})

subscriptionsRouter.delete('/:id', (req, res) => {
    res.send({title: "Deleting the subscription By Id."})
})

subscriptionsRouter.get('/user/:id', (req, res) => {
    res.send({title: "Getting all subscriptions of the user."})
})

subscriptionsRouter.get('/:id/cancel', (req, res) => {
    res.send({title: "Canceling the subscription"})
})


subscriptionsRouter.get('/upcoming-renewals', (req, res) => {
    res.send({title: "Upcoming renewals"})
})

export default subscriptionsRouter
