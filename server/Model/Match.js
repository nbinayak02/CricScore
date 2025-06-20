const mongoose=require("mongoose");
const {Schema}=mongoose;


const MatchSchema=new Schema({

tournament_name:{
    type:String,
    required:true
},
teamA:{
    type:String,
    required:true
},
teamB:{
    type:String,
    required:true
},
match_date:{
    type:Date,
    required:true
},
match_time:{
    type:String,
    required:true
},
venue:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now
}








});

module.exports=mongoose.model("Match",MatchSchema);