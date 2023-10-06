require('dotenv').config()
const asyncWrapper = require('./middlesWires/asyncWarpper');
const express =  require ('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const httpStatus = require('./utilis/httpStatus');
const appError = require('./utilis/appError');
const url = process.env.MONGO_URL; 
mongoose.connect(url).then(() => {
    console.log('mongodb connect success');
})

app.use(cors())
app.use(express.json());


const coursesRouter  = require ('./routes/courses-routes');
const userRouter = require('./routes/users-routes');


app.use('/api/courses', coursesRouter);
app.use('/api/users', userRouter);

app.all('*' , (req, res , next) => {
    return res.status(404).json({ status : httpStatus.ERROR ,message : 'this resource is not available' 
})})
 
app.use((error, req ,res, next) => { 
    res.status(error.statusCode || 500 ).json({status : error.statusText || httpStatus.ERROR , message: error.message , code: error.statusCode || 500 , data: null});
 })

app.listen(process.env.PORT ||4000, ()=> {
    console.log('listening on port 4000');
});