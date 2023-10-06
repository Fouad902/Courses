const express = require('express');
const { body} = require('express-validator');

const router = express.Router();
const courseController = require('../conterollers/coursessController');
const verfiyToken = require('../verifyToken');
const allowedTo = require('../allowedTo');
const userRoles = require('../utilis/userRoles');

router.route('/')
    .get( courseController.getAllCourse)
    .post( verfiyToken, validtionSchema = [
    
        body('title')
        .notEmpty()
        .withMessage("title is required")
        .isLength({min : 2}) 
        .withMessage("title at least is 2 digits"),  
        body( 'price')
           .notEmpty()
           .withMessage("price is required")
        
], courseController.addCourse)

router.route('/:courseId')
    .get( courseController.getCourse)
    .patch(  courseController.updateCourse)
    .delete( verfiyToken, allowedTo(userRoles.ADMIN,userRoles.MANAGER) , courseController.deleteCourse );


 module.exports =router;