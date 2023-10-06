const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utilis/userRoles');
const userSchema =new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
     email : {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'filed must be valid email address']
    },
    password : {
        type: String,
        required: true
    },
    token :{
        type: String
    },
    role: {
        type: String,
        enum: [userRoles.USER ,userRoles.ADMIN, userRoles.MANAGER ],
        default: userRoles.USER 
    }
})


module.exports = mongoose.model('User', userSchema)