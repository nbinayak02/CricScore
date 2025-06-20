const mongoose=require('mongoose');
const {Schema}=mongoose;

const tournamentSchema=new Schema({

tournament_name:{
    type:String,
    required:true
},
start_date:{
    type:Date,
    required:true
},
end_date:{
    type:Date,
    required:true
},
location:{
    type:String,
    required:true
},
description:{
    type:String
},
date:{
    type:Date,
    default:Date.now
}

});
module.exports=mongoose.model("TournamentSchema",tournamentSchema);