const express = require('express');
const router = express.Router();
const {user}= require('../Models/user');

router.get('/',(req,res)=>{
    res.send('task routes are working');
});
module.exports=router;