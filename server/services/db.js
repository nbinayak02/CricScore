const mongoose=require('mongoose');
const mongooseURL="mongodb://127.0.0.1:27017/cricscore";

const connectToMongoose= async ()=>{

    try{
       await mongoose.connect(mongooseURL);
       console.log("Connected to mongoDB Successfully");
    }
    catch(error){
        console.log(error);
    }

}

module.exports=connectToMongoose;