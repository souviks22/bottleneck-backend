import { Router } from "express"
import { header } from "express-validator"
import { } from "../controllers/algorithm.js"
import { isAuthorized } from "../middlewares/auth.js"

const feedbackRouter = Router()

feedbackRouter.get('/',
    header('authorization').notEmpty(),
    isAuthorized,
    fetchAlgorithmsHandler
)

feedbackRouter.post('/',
    header('authorization').notEmpty(),
    isAuthorized,
    fetchSingleAlgorithmHandler
)

export default feedbackRouter