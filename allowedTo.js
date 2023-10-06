const appError = require("./utilis/appError");
const verfiyToken = require("./verifyToken"); 
module.exports= (...roles) =>{
    console.log( "ROles:" , roles );
    return (req,res , next) => {
         
        if(!roles.includes(req.currentUser.role)){
            return next(appError.create('this role is not allowed', 401  ));
        }
        next();
    } 
}