const express=require('express');
const app=express();
app.use(express.json());
require('dotenv').config();
require('./db');
const port=process.env.PORT||3001;
const mongoose=require('mongoose');
const userRoutes=require('./routes/userRoutes');
const taskRoutes=require('./routes/taskRoutes');
app.use('/task',taskRoutes);
app.use('/user',userRoutes);
app.get('/',(req,res)=>{
    res.send('welcome to the home page');
});
app.listen(port,()=>{
    console.log(`server is running on the ${port}`);
})
