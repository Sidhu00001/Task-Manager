require('dotenv').config();
const mongoose=require('mongoose');
const MONGO_URI=process.env.MONGO_URI;
const DB_NAME=process.env.DB_NAME;
mongoose.connect(MONGO_URI,{
    dbName:DB_NAME,
}).then(()=>{
    console.log(`Connected to MongoDB database: ${DB_NAME}`);
}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err);
})