import { Router } from "express"
import { header } from "express-validator"
import { fetchFeedBacksHandler, addFeedBackHandler } from "../controllers/feedback.js"
import { isAuthorized } from "../middlewares/auth.js"
import { algorithmDoesExist } from "../middlewares/existence.js"

const feedbackRouter = Router()

feedbackRouter.get('/',
    header('authorization').notEmpty(),
    isAuthorized,
    algorithmDoesExist,
    fetchFeedBacksHandler
)

feedbackRouter.post('/',
    header('authorization').notEmpty(),
    isAuthorized,
    algorithmDoesExist,
    addFeedBackHandler
)

export default feedbackRouter