const User=require('./schema.js');

async function Signup(req, res){
    try {

    const {name,registrationnumber,phonenumber,password,idcardimg} = req.body;

    const user = new User({name,registrationnumber,phonenumber,password,idcardimg});
 
    await user.save()
 
    res.status(201).json(user);
  
}
    catch(err) {
        console.error(err);
        if(err.code==11000){
            res.status(400).json({message: 'User already exists.'})
        }
        else{
            res.status(500).json({message: 'Server Error.'})
        }
    }
}

module.exports = Signup;