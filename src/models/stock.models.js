import mongoose from "mongoose";

const stockSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
    },
    initialStock:{
        type:Number,
        required:true
    },
    minimumRequiredStock:{
        type:Number,
        required:true
    },
    
},{timestamps:true});




export const Stock = mongoose.model('Stock',stockSchema)