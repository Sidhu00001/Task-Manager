const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const schema=mongoose.Schema;
const userSchema= new schema({
    name:{type:String ,required :true},
    email:{type:String ,required :true,unique:true},
    password:{type:String ,required :true},
}
,{
    timestamps:true
});
userSchema.pre('save',async function(next){
   const user=this;
   if(user.isModified('password')){
    user.password=await bcrypt.hash(user.password,5);  
   }
    next();
});
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
const User=mongoose.model('User',userSchema);
module.exports={
    User
}