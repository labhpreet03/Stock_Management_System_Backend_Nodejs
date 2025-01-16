import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();


const app = express()
app.use(cors({
   options:{ origin:process.env.ORIGIN,
    Credential:true}
}
))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('../public'))
app.use(cookieParser())


// routers
import router from './routes/stock.routes.js'
app.use("/api",router)



export {app}