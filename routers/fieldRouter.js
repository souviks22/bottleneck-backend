import { Router } from "express"
import { body, header } from "express-validator"
import { fetchFieldsHandler, fetchAlgorithmsOfFieldHandler, addFieldHandler, addAlgorithmHandler } from "../controllers/field.js"
import { isAuthorized } from "../middlewares/auth.js"
import { fieldDoesExist } from "../middlewares/existence.js"

const fieldRouter = Router()

fieldRouter.get('/',
    header('authorization').notEmpty(),
    isAuthorized,
    fetchFieldsHandler
)

fieldRouter.get('/:fieldId',
    header('authorization').notEmpty(),
    isAuthorized,
    fieldDoesExist,
    fetchAlgorithmsOfFieldHandler
)

fieldRouter.post('/',
    body('name').notEmpty(),
    body('level').notEmpty(),
    header('authorization').notEmpty(),
    isAuthorized,
    addFieldHandler
)

fieldRouter.post('/:fieldId',
    body('name').notEmpty(),
    body('difficulty').notEmpty(),
    body('image').notEmpty(),
    body('description').notEmpty(),
    body('media').notEmpty(),
    header('authorization').notEmpty(),
    isAuthorized,
    fieldDoesExist,
    addAlgorithmHandler
)

export default fieldRouter