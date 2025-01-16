import mongoose from "mongoose";
import { DATABASE_NAME } from "../constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const connectdb = async()=>{
   try{
    const result = await mongoose.connect(`${process.env.DATABASE_URL}/${DATABASE_NAME}`)
   //  return new ApiResponse(200,result,"mongodb connect success")
   console.log("mongoosh connect success ")

   }
   catch(err){
      throw new ApiError(400,"database not connect",err)
   }
}

export default connectdb;