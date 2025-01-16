import {app} from "./app.js"
import connectdb from "./db/connectDB.js"
import { ApiError } from "./utils/ApiError.js"
import { ApiResponse } from "./utils/ApiResponse.js"
const PORT = process.env.PORT

connectdb()
.then(()=>{
    app.listen(PORT , ()=>{
        console.log(`the server connect on http://localhost:${PORT}`)
        // return new ApiResponse(200,)
    })
})
.catch((err)=>{
    throw new ApiError(400,"database not connect in app", err)
})
