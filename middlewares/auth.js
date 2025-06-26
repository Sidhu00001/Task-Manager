const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User } = require('../Models/user'); 
require('dotenv').config();
const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            throw new Error('Authorization header missing');
        }
        const token = authHeader.replace('Bearer ', '');
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(401).send({ error: err.message });
    }
}
module.exports={
    auth
}