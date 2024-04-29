const User = require("../models/userModels")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const GetDone = (req, res) =>
    res.send("ROUTING")

const Register = async (req, res) => {

    try {
        const { name, email, password } = req.body
        const existEmail = await User.findOne({ email: email })
        console.log(existEmail)
        if (existEmail)
            res.status(200).json({ msg: "Email already exist,please make sure to login" })
        else {
            console.log("else")
            const HashPW = await bcrypt.hash(password, 10)
            console.log(HashPW)
            const myuser = await User.create({ email, password: HashPW })
            const token = await jwt.sign({ id: myuser._id }, process.env.JWT_KEY, { expiresIn: "7D" })
            console.log(HashPW)
            res.status(201).json({ msg: "Register done", token })
        }
    }
    catch (error) {
        res.status(500).json({ msg: "Something went wrong", error })


    }




}


const Login = async (req, res) => {


    try {
        
        const {  email, password } = req.body
        const existEmail = await User.findOne({ email: email })
        console.log(existEmail)
        if (!existEmail)
            res.status(200).json({ msg: "make sure to register first" })
        else {
            console.log("else")
            const verifypassword = await bcrypt.compare(password, existEmail.password)
            if(verifypassword){
                const token = await jwt.sign({ id: existEmail._id }, process.env.JWT_KEY, { expiresIn: "7D" })
            res.status(201).json({ msg: "login done", token }) 
            }
            else{
                res.status(400).json({msg:"wrong password"})
            }
           
        }
    }
    catch (error) {
        res.status(500).json({ msg: "Something went wrong", error })

        
    }

}
const getUserData=async(req,res)=>{
    try {
        const userDate=await User.findOne({_id:req.body.userId})
        res.status(200).json({msg:"Get all user data",userDate})
    } catch (error) {res.status(500).json({ msg: "Something went wrong", error })
        
    }
}



module.exports = { GetDone, Register,Login,getUserData }