import { ApiError } from "./ApiError.js"

const asyncHandler = (fn) => async(req,res,next)=>{
    try{
        return fn(req,res,next)
    }
    catch(err){
        next(err)
        // throw new ApiError(400,"err in asyncHandler file ",err)
    }
}

export {asyncHandler}