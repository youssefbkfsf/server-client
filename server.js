const express=require("express")
const app=express()
const dotenv=require('dotenv')
const cors=require('cors')
const connectDB=require("./config/connectDB")
dotenv.config({path:"./config/.env"})
port=process.env.PORT || 5000
app.use(express.json())
connectDB()

app.use('/api',require('./routes/userRoutes'))
app.use(cors())



app.listen(port,(err=>{
    err?console.log("error",err):console.log("Server is Running in Port :",port)
}))