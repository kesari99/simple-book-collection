import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"

import bookRoutes from "./routes/book-routes.js"

dotenv.config()

const app = express()
app.use(express.json())

const port = process.env.PORT

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}))


const connectDb = async () => {
    try{

        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${connect.connection.host} ${connect.connection.name}`)

    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

app.use("/book", bookRoutes)




app.listen(port, () => {
    connectDb()
    console.log(`server is running on port ${port}`)
}) 