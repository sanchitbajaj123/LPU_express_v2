const mongoose = require('mongoose');
const {Schema,model}= require('mongoose');
const { checkPassword, encryptPassword } = require("./passencrypt");
const userSchema = new Schema({
name:{
    type:String,
    required:true,
},
registrationnumber:{
    type:String,
    required:true,
},
phonenumber:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true,
    
},
idcardimg:{
    type:String,
    required:true,
}
},{timestamps:true})
userSchema.pre('save', async function(next) {

    if (this.isNew) {
        const existingUser = await this.constructor.findOne({ registrationnumber: this.registrationnumber });
        if (existingUser) {
            return next(new Error('Registration number already exists.'));
        }
        try {
            this.password = await encryptPassword(this.password);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

userSchema.statics.checkpassandreg=async (registrationnumber,password)=>{
    const user=await this.findOne({registrationnumber});
    if(!user){
        throw new Error('User not found');
    }
    const isMatch=await checkPassword(password,user.password);
    if(!isMatch){
        throw new Error('Incorrect password');
    }
    return user;
}

const User = model("User", userSchema);


const connectdb=async()=>{
    await mongoose.connect('mongodb://localhost:27017/lpuexpress-v2')
    console.log('MongoDB Connected...');
}
connectdb();

module.exports=User;