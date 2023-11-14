import { Router } from "express"
import { body, header } from "express-validator"
import {
    fetchFieldsHandler, fetchAlgorithmsHandler, fetchAlgorithmsOfFieldHandler,
    fetchSingleAlgorithmHandler, addFieldHandler, addAlgorithmHandler,
    likeAlgorithmHandler, dislikeAlgorithmHandler
} from "../controllers/algorithms.js"
import { isAuthorized } from "../middlewares/auth.js"

const algoRouter = Router()

algoRouter.get('/',
    header('authorization').notEmpty(),
    isAuthorized,
    fetchFieldsHandler
)

algoRouter.get('/all',
    header('authorization').notEmpty(),
    isAuthorized,
    fetchAlgorithmsHandler
)

algoRouter.get('/:fieldId',
    header('authorization').notEmpty(),
    isAuthorized,
    fetchAlgorithmsOfFieldHandler
)

algoRouter.get('/:fieldId/:algoId',
    header('authorization').notEmpty(),
    isAuthorized,
    fetchSingleAlgorithmHandler
)

algoRouter.post('/',
    body('name').notEmpty(),
    body('level').notEmpty(),
    header('authorization').notEmpty(),
    isAuthorized,
    addFieldHandler
)

algoRouter.post('/:fieldId',
    body('name').notEmpty(),
    body('difficulty').notEmpty(),
    body('image').notEmpty(),
    body('description').notEmpty(),
    body('media').notEmpty(),
    header('authorization').notEmpty(),
    isAuthorized,
    addAlgorithmHandler
)

algoRouter.put('/likes/:algoId',
    header('authorization').notEmpty(),
    isAuthorized,
    likeAlgorithmHandler
)

algoRouter.put('/dislikes/:algoId',
    header('authorization').notEmpty(),
    isAuthorized,
    dislikeAlgorithmHandler
)

export default algoRouter