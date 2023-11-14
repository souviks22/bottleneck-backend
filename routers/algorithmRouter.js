import { Router } from "express"
import { header } from "express-validator"
import { fetchAlgorithmsHandler, fetchSingleAlgorithmHandler, likeAlgorithmHandler, dislikeAlgorithmHandler } from "../controllers/algorithm.js"
import { isAuthorized } from "../middlewares/auth.js"
import { algorithmDoesExist } from "../middlewares/existence.js"

const algorithmRouter = Router()

algorithmRouter.get('/',
    header('authorization').notEmpty(),
    isAuthorized,
    fetchAlgorithmsHandler
)

algorithmRouter.get('/:algoId',
    header('authorization').notEmpty(),
    isAuthorized,
    algorithmDoesExist,
    fetchSingleAlgorithmHandler
)

algorithmRouter.put('/likes/:algoId',
    header('authorization').notEmpty(),
    isAuthorized,
    algorithmDoesExist,
    likeAlgorithmHandler
)

algorithmRouter.put('/dislikes/:algoId',
    header('authorization').notEmpty(),
    isAuthorized,
    algorithmDoesExist,
    dislikeAlgorithmHandler
)

export default algorithmRouter