const {User,Customer}=require('./schema.js');
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
        console.log(1);
        const { registrationnumber, password } = req.body;
        console.log(registrationnumber);
        console.log(password);
        const user = await User.findOne({ registrationnumber: registrationnumber});
        const isMatch = await checkPassword(password, user.password);

        if (isMatch) {
            res.status(201).json(user);
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }

    }
    catch(err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid credentials' });

    }
}
async function Customeradd(req, res) {
    try{
        const{registrationnumber,parcelname,deliverycompany,fare,location}=req.body;
        console.log(req.body);
        const check=await Customer.findOne({registrationnumber:registrationnumber})
        if(check){
            res.status(401).json({ message: 'Only one parcel at a time can be treated'});
        }
        else{
        const user = await User.findOne({registrationnumber:registrationnumber})
        const customer = new Customer({
            name: user.name,
            registrationnumber: registrationnumber,
            phonenumber: user.phonenumber,
            idcardimg: user.idcardimg,
            parcelname: parcelname,
            deliverycompany: deliverycompany,
            fare: fare,
            location: location,
        });
        await customer.save()
        res.status(201).json(customer);}

    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
async function Customerlist(req, res) {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
async function Parcelservice(req, res) {
    try{
        console.log(req.body)
        const {userregistrationumber,customerregistrationnumber}=req.body;
        console.log(userregistrationumber)
        console.log(customerregistrationnumber)
        const user = await User.findOne({ registrationnumber:userregistrationumber});
        console.log(user)
        const customer = await Customer.findOne({ registrationnumber: customerregistrationnumber});
        console.log(customer)
        user.customerselected.push(customerregistrationnumber);
        await user.save();
        customer.deliverypersonregistration=userregistrationumber;
        await customer.save();
        res.status(201).json(customer);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
async function Slectedlist(req, res) {
    try {
        const { registrationnumber } = req.body;
        const user = await User.findOne({ registrationnumber });
        res.status(200).json(user.customerselected);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { Signup, Login,Customeradd,Customerlist,Parcelservice,Slectedlist };