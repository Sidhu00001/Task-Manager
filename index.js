const express=require('express');
const app=express();
require('dotenv').config();
require('./db');
const port=process.env.PORT||3001;
const mongoose=require('mongoose');
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('welcome to the home page');
});
app.listen(port,()=>{
    console.log(`server is running on the ${port}`);
})
