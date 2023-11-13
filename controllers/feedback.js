import catchAsync from "../errors/async";
import Algorithm from "../models/Algorithm";

export const likehandler = catchAsync(async (req, res) => {

    const { fieldId, algoId } = req.params
    const { userId } = req.body

    const algorithm = await Algorithm.findById(algoId)
    const userinLike = algorithm.likes.indexOf(userId)
    const userinDislike = algorithm.dislikes.indexOf(userId)
    if (!algorithm) throw new error('Algorithm does not exist.')
    if (userinDislike != -1) throw new error('Cannot like and dislike at the same time.')
    if (userinLike == -1) {
        algorithm.likes.push(userId)
        await algorithm.save()
        res.status(201).json({
            success: true,
            message: "Like registered successfully."
        })
    }
    else {
        algorithm.likes.pull(userId)
        await algorithm.save()
        res.status(202).json({
            success: true,
            message: "Like removed successfully."
        })
    }
}
)

export const dislikehandler = catchAsync(async (req, res) => {

    const { fieldId, algoId } = req.params
    const { userId } = req.body

    const algorithm = await Algorithm.findById(algoId)
    if (!algorithm) throw new error("Algorithm does not exist.")
    const userinLike = algorithm.likes.indexOf(userId)
    const userinDislike = algorithm.dislikes.indexOf(userId)
    if (userinLike != -1) throw new error('Cannot like and dislike at the same time.')
    if (userinDislike == -1) {
        algorithm.dislikes.push(userId)
        await algorithm.save()
        res.status(201).json({
            success: true,
            message: "Dislike registered successfully."
        })
    }
    else {
        algorithm.dislikes.pull(userId)
        await algorithm.save()
        res.status(202).json({
            success: true,
            message: "Dislike removed successfully."
        })
    }
}
)