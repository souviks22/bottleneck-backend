import { Router } from "express"
import { header } from "express-validator"
import { allUsersHandler } from "../controllers/user.js"

const userRouter = Router()

userRouter.get('/',
    header('Authentication').notEmpty(),
    allUsersHandler
)

export default userRouter