const jwt=require('jsonwebtoken')
const userMiddleware=async(req,res,next)=>{




    try{
        const token=req.headers.token
        if(!token){
                    res.status(400).json({msg:"you are not authorized"})

        }
    else{        const VerifyToken=await jwt.verify (token,process.env.JWT_KEY)
if(!VerifyToken){
    res.status(400).json({msg:"you are not authorized"})
}
else{
        req.body.userId=VerifyToken._id
        next()

}
    }
    
    }catch (error){
    res.status(500).json({msg:"Something went wrong",error})
    }

}




module.exports=userMiddleware