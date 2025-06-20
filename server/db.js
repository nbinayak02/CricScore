const mongoose=require('mongoose');
// const mongooseURL="mongodb://127.0.0.1:27017/inotebook";
const mongooseURL="mongodb://127.0.0.1:27017/CricScore?readPreference=primary&appname=MongoDB%20&directConnection=true&ssl=false";

//use local server ipv4 not ipv6 :::mongodb://127.0.0.1:27017

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