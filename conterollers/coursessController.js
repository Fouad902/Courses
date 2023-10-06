const {   validationResult} = require('express-validator');
const Course = require('../models/modulsCourses')
const httpStatus = require('../utilis/httpStatus');
const asyncWarpper = require('../middlesWires/asyncWarpper');
const appError = require('../utilis/appError');

const getAllCourse =  asyncWarpper( async (req, res) => {
    const query = req.query ;

    const limit = query.limit || 10;
    const page = query.page|| 1;
    const skip = (page - 1) * limit;
    
    
    const courses= await Course.find({},{"__v" : false}).limit(limit).skip(skip);
    res.status(200).json(
        {
            status:  httpStatus.SUCCESS,
             data: courses});
})
const getCourse = asyncWarpper(
     async (req, res) => {
         const course = await Course.findById(req.params.courseId)
         if(!course){
            const error= appError.create('not found course',404 ,httpStatus.FAIL);
             return next(error); 
             
            }
                res.json(
                    {
                        status:  httpStatus.SUCCESS,
                        data: course});
                        
  //                      try{
    //                } catch(err) {
//    console.log(err);
//}
})
const addCourse= asyncWarpper( async (req,res , next) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = appError.create(errors.array(), 400 , httpStatus.FAIL)
        return next(error);}
    const newCourse=  new Course(req.body);

    await newCourse.save();

  res.status(201).json(
    {
        status:  httpStatus.SUCCESS,
         data: newCourse});

 }

)
 const updateCourse = asyncWarpper( async (req ,res) => {
    const courseId =req.params.courseId;
   
    const updateCourse = await Course.updateOne({_id:courseId }, {$set: {...req.body}})
        return res.status(200).json({ 
            status:  httpStatus.SUCCESS,
            data: {course: updateCourse}});  
}
 )
 const deleteCourse = asyncWarpper( async (req, res) => {
    
    const data = await Course.deleteOne({ _id: req.params.courseId});
    res.status(200).json(
        {
            status:  httpStatus.SUCCESS,
             data: null});
        
})

 module.exports = {
    getAllCourse,
    deleteCourse,
    updateCourse,
    addCourse,
    getCourse
 }