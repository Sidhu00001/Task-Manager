const express = require('express');
const router = express.Router();
const {User}= require('../Models/user');
const bcrypt=require('bcrypt');
const jsonwebtoken=require('jsonwebtoken');
require('dotenv').config();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).send({ error: err.message }); // <-- fix here
    }
});

router.post('/login',async (req,res)=>{
 try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        throw new Error('User not found');
    }
    const isMatch=await bcrypt.compare(password,user.password); 
    if(!isMatch){
        throw new Error('Invalid credentials');
    }
    const token=jsonwebtoken.sign({id:user._id.toString()},process.env.JWT_SECRET);
res.status(200).send({message:'Login successful',token});
}
catch(err){
    res.status(400).send({error: err.message});
}

});
module.exports=router;