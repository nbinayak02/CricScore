to install mongoose :-> npm i mongoose

to connect with mongodb using mongoose:->

const mongoose=require('mongoose');
const mongooseURL="mongodb://127.0.0.1:27017/CricScore?readPreference=primary&appname=MongoDB%20&directConnection=true&ssl=false";
 await mongoose.connect(mongooseURL);