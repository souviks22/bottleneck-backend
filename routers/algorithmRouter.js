import { Router } from "express"
import { header } from "express-validator"
import { fetchAlgorithmsHandler, fetchSingleAlgorithmHandler, likeAlgorithmHandler, dislikeAlgorithmHandler } from "../controllers/algorithm.js"
import { isAuthorized } from "../middlewares/auth.js"

const algorithmRouter = Router()

algorithmRouter.get('/',
    header('authorization').notEmpty(),
    isAuthorized,
    fetchAlgorithmsHandler
)

algorithmRouter.get('/:algoId',
    header('authorization').notEmpty(),
    isAuthorized,
    fetchSingleAlgorithmHandler
)

algorithmRouter.put('/likes/:algoId',
    header('authorization').notEmpty(),
    isAuthorized,
    likeAlgorithmHandler
)

algorithmRouter.put('/dislikes/:algoId',
    header('authorization').notEmpty(),
    isAuthorized,
    dislikeAlgorithmHandler
)

export default algorithmRouter