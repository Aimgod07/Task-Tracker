const User = require("../models/user.model");
const jwt = require("jsonwebtoken");



async function authMiddleware(req, res, next) {

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user= await User.findById(decoded.userId);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
}

async function authSystemUserMiddleware(req,res,next){
  const token = req.cookies.token || req.headers.authorization?.split("")[ 1 ]

  if (!token){
    return res.status(401).json
  }

  try{
    const decoded =jwt.verify(token, process.env.JWT_SECRET)

    const user=await User.findById(decoded.userId).select("+systemUser")
    if (!user.systemUser){
      return res.status(403).json({
        message:"Forbidden access,not a system user" 
      })
    }
    req.user=user

    return next()
  }
  catch(err){
      return res.status(401).json({
        message:"Unauthorised access, token is invalid"
      })
  }
}
const protect = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            alert: "Unauthorized. Please login."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = protect;

module.exports = authMiddleware;