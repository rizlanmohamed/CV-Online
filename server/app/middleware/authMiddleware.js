import jwt from "jsonwebtoken";
import {
    findByUserID,
  } from "../modal/users.modal.js";

const protect = async (req, res, next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await findByUserID(decode.id)
            next();
        } catch (error) {
            console.log(error)
            res.status(403).json({message : error})
        }
    }

    if(!token){
        res.status(403).json({message : 'Not authorized - no token found' })
    }
}

export { protect }