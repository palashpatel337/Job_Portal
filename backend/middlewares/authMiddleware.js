import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = (req, res, next) => {
  try {
    console.log("Incoming Authorization Header:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    // Remove "Bearer "
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};


//Admin access
export const isAdmin = async (req,res,next) =>{
    try {
    console.log("Decoded Token from requireSignIn:", req.user);

        const user = await userModel.findById(req.user._id);

        console.log("DB user:", user);

        if(!user){
            return res.status(401).send({
                success:false,
                message:"User not found"
            })
        }

        if(user.role !== "recruiter"){
            return res.status(401).send({
                success : false,
                message : 'Unauthorized access'
            })
        }

        next()
    } catch (error) {
        console.log("Middleware error:", error);
        res.status(401).send({
            success: false,
            message: 'error in middleware',
            error
        })
    }
}
