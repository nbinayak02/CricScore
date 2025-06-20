const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const User=require('../Model/User');
const {body,validationResult}=require('express-validator');
const Scorer = require('../Model/Scorer');

//sign up for the scorer
router.post('/signup/scorer',[

  body('email','Enter a valid email').isEmail(),
    body('name','Name should be of length[3-20]').isLength({min:3,max:20}),
    body('password','Password must be at least 8 character').isLength({min:8}),
    body('phone','Phone is Required').isLength({min:9,max:40})
],


async (req,res)=>{
    const error=validationResult(req);

    if(error.isEmpty()){
const { email }=req.body;
try{


      const isscorer=await Scorer.findOne( { email } );

      if(isscorer){

        return res.status(400).json({ error:"User Already Exist:\nEnter new User data!!!!"});
      }

        //hashing of the user password to securly store in database
  const salt=await bcrypt.genSalt(10);
  const setPassword= await bcrypt.hash(req.body.password,salt);

    

    //to store user signup details to the datbase
    const scorer1=await Scorer.create({
    name:req.body.name,
    email:req.body.email,
    password:setPassword,
    phone:req.body.phone

    });
        const data={
            user:{
            id:scorer1.id,
            name:scorer1.name,
            email:scorer1.email,
            phone:scorer1.phone,
            date:scorer1.date
        }
    }
    console.log(data.user);
      res.json({user:data.user});

    }
catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal Server Error or duplicate entry." });
  }
      
         
        
        
    }
    else{

        
        res.status(400).json({ error: error.array() });
        
    }

});

//signup for the customer
router.post('/signup',[

  body('email','Enter a valid email').isEmail(),
    body('name','Name should be of length[3-20]').isLength({min:3,max:20}),
    body('password','Password must be at least 8 character').isLength({min:8}),
    body('phone','Phone is Required').isLength({min:9,max:40})
],


async (req,res)=>{
    const error=validationResult(req);

    if(error.isEmpty()){


const { email }=req.body;
      //check to database for existing user or not
      try{
const user = await User.findOne({ email });


      if(user){

        console.log("User already Exist");
        return res.status(400).json({ error:"User Already Exist:\nEnter new User data!!!!"});
      }

        //hashing of the user password to securly store in database
  const salt=await bcrypt.genSalt(10);
  const setPassword= await bcrypt.hash(req.body.password,salt);

    

    //to store user signup details to the datbase
    const user1=await User.create({
    name:req.body.name,
    email:req.body.email,
    password:setPassword,
    phone:req.body.phone

    });


        const data={
            user:{
            id:user1.id,
            name:user1.name,
            email:user1.email,
            phone:user1.phone,
            date:user1.date
        }
    };
    console.log(data.user);
      res.json({user:data.user});

    }

    catch(err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal Server Error or duplicate entry." });
  }
      
              
        
    }
    else{

        
        res.status(400).json({ error: error.array() });
        
    }

});

//backend for Scorer login 
router.post("/login/scorer", [
  body('email', 'Enter a valid Email!!').isEmail(),
  body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
  body('password', 'Password must be Alphanumeric').isAlphanumeric(),
  body('password', "Password Cannot be Blank").exists()
],
async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { email, password } = req.body;

  try {
    const scorer = await Scorer.findOne({ email });
    
    if (!scorer) {
      return res.status(400).json({ error: "Scorer doesn't exist. Please Signup." });
    }

    // ✅ Compare password with hashed one
    const comparepassword = await bcrypt.compare(password, scorer.password);

    if (!comparepassword) {
      return res.status(400).json({ error: "Enter valid Password!!" });
    }

    const payload = {
      user: {
        id: scorer.id,
        name: scorer.name,
        email: scorer.email,
        phone: scorer.phone,
        date: scorer.date,
      }
    };

    res.json({ user: payload.user });

  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
//backend for customer login 
router.post("/login", [
  body('email', 'Enter a valid Email!!').isEmail(),
  body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
  body('password', 'Password must be Alphanumeric').isAlphanumeric(),
  body('password', "Password Cannot be Blank").exists()
],
async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist. Please Signup." });
    }

    // ✅ Compare password with hashed one
    const comparepassword = await bcrypt.compare(password, user.password);

    if (!comparepassword) {
      return res.status(400).json({ error: "Enter valid Password!!" });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        date: user.date,
      }
    };

    res.json({ user: payload.user });

  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports=router;