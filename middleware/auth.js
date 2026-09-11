const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'my-secret-key';

const authUser =  async (req,res,next) =>{
    try {
        // console.log(req.query.token);
        next();
        
        // const detail = jwt.verify(req.query.token, secretKey)
        // if(detail){
        //     next();
        // }
    } catch (error) {
       return res.status(500).json(error)    
    }
}

module.exports = {authUser};