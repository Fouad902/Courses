const asyncWarpper = require('../middlesWires/asyncWarpper');
const User = require('../models/users.model');
const httpStatus= require('../utilis/httpStatus');
const appError = require('../utilis/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utilis/generateJWT');

const getAllUsers = asyncWarpper( async (req, res) => {
    const query = req.query ;

    const limit = query.limit || 10;
    const page = query.page|| 1;
    const skip = (page - 1) * limit ;
    
    
    const users= await User.find({},{"__v" : false , "password" : false }).limit(limit).skip(skip);
    res.status(200).json(
        {
            status:  httpStatus.SUCCESS,
             data:{ users}});
})



const register = asyncWarpper( async (req,res ,next) => {
    const {firstName, lastName , email , password , role} = req.body;

    const oldUser = await User.findOne({email: email});
    if (oldUser) {
        const error = appError.create('user already exists' , 400 , httpStatus.FAIL)
        return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        firstName,
        lastName,
        email,
        password : hashedPassword,
        role 
         });

        const token = await generateJWT({email : newUser.email, id: newUser._id , role: newUser.role})
         newUser.token = token;
    await newUser.save();

    res.status(201).json(
        {
            status:  httpStatus.SUCCESS,
            data:  {user: newUser}});
    
     }  
)

const login =asyncWarpper( async(req , res ,next) => {
    
    const {email , password} = req.body;
    if( !email && !password ){
        const error = appError.create('email and password are required', 400 , httpStatus.FAIL);
        return next(error);
    }

    const user = await User.findOne({email: email})
    if( !user){
        const error = appError.create('User Not Found', 400 , httpStatus.FAIL);
        return next(error);
    }
    const matchedpassword = await bcrypt.compare(password ,user.password);
    
    
    if( user && matchedpassword){
         const token = await generateJWT({email: user.email, id: user._id , role: user.role})
      return res.json(
             {
                status:  httpStatus.SUCCESS,
                data:  {token }});
                
            }else {
                const error = appError.create('something wrong !!!!', 400 , httpStatus.FAIL);
        return next(error);
            }  
            
        }
    )
        

module.exports = {
    getAllUsers,
    register,
    login
}