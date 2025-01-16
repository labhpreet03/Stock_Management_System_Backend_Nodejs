import mongoose from "mongoose";
const logSchema= new mongoose.Schema( {
    stockId:{
        type:String,
        required:true,
    },
    stockName:{
        type:String,
        required:true
    },
    stockOperations:{
        type:String,
        required:true,
        // enum:["restock","sell"],
    },
    StockPreQuantity:{
        type:Number,
        required :true,
    },
    stockCurrQuantity:{
        type:Number,
        required :true,
    }
},{
    timestamps:true
})

export const Log = mongoose.model("Log",logSchema)