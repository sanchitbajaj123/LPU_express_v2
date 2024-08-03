const User=require('./schema.js');
const {checkPassword} = require('./passencrypt.js');
async function Signup(req, res){
    try {
    
    const {name,registrationnumber,phonenumber,password,idcardimg} = req.body;

    const user = new User({name,registrationnumber,phonenumber,password,idcardimg});
 
    await user.save()
 
    res.status(201).json(user);
  
    }
    catch(err) {
    console.error(err);
        
    res.status(400).json({message: 'User already exists'})
        
    }
}
async function Login(req, res) {
    try {
        const { registrationnumber, password } = req.body;
        console.log(registrationnumber);
        console.log(password);
        const user = await User.findOne({ registrationnumber: registrationnumber});
        const isMatch = await checkPassword(password, user.password);

        if (isMatch) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }

    }
    catch(err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid credentials' });

    }
}

module.exports = { Signup, Login };