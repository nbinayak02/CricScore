const mongoose=require("mongoose");
const {Schema}=mongoose;

const MatchSchema=new Schema(
    {

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
teamA_id:{
    type: mongoose.Schema.Types.ObjectId, ref: 'teams',
    required:true
},
teamB_id:{
    type:mongoose.Schema.Types.ObjectId, ref: 'teams',
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
 createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'scorers',
      required: true,
  
},

    },
{ timestamps: true }
);

module.exports=mongoose.model("Match",MatchSchema);