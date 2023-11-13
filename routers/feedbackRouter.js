import { Router } from "express";
import { dislikeHandler, likehandler } from "../controllers/feedback";
import { isAuthorized } from "../middlewares/auth";

const feedbackRouter = Router();

feedbackRouter.post('/:fieldId/:algoId/likes',
    isAuthorized,
    likehandler
)

feedbackRouter.post('/:fieldId/:algoId/dislikes',
    isAuthorized,
    dislikeHandler)

export default feedbackRouter