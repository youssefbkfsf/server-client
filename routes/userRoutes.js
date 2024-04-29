const express=require('express')
const router=express.Router()
const userMiddleware=require('../middleware/userMiddleware')
const{GetDone,Register,Login,getUserData}=require('../controller/Usercontrollers')

router.get("/",GetDone)
router.post('/register',Register)

router.get('/userdata',userMiddleware,getUserData)

 router.post("/login",Login)














module.exports=router