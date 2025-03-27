// express => 
// mongoose => Help to connect with database
// jsonwebtoken => With this, we can create authentication system 
// bcrypt => we can encrypt the user's data and store in the database 
// cors => with this Help, we are giving permission to our fronted to connect with our backened
// dotenv => we can create environment variable in our project 
// body-parser => we can parse the data coming from the user
// multer => we can create image store system 
// stripe => we can create payment gateway on the webpage 
// validator => we can check the password and emailId is valid or not 
// nodemon => when we save our project our server will be restart 


import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"



// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors()) // we can connect backened from any frontened


// db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
// request the data from server

app.get("/",(req,res) => {
    res.send("API Working")
})

// to use express lserver
app.listen(port,()=>{
   console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://aaryan2175:greatSTACK@cluster0.kancjh0.mongodb.net/?

