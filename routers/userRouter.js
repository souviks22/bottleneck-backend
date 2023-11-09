import { Router } from "express"
import { header, body } from "express-validator"
import { fetchUserHandler } from "../controllers/user.js"
import { isAuthorized } from "../middlewares/auth.js"

const userRouter = Router()

userRouter.get('/:id',
    header('authorization').notEmpty(),
    isAuthorized,
    fetchUserHandler
)

userRouter.put('/:id',
    header('authorization').notEmpty(),
    body('update').notEmpty(),
    isAuthorized
)

export default userRouter