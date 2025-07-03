const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const MatchSchema =require("../models/Match");
router.post('/creatematch',
    
    async (req,res)=>{


        const { match_time,match_date }=req.body;
try{
    const Is_tournament=await MatchSchema.findOne({ match_time,match_date });
    if(Is_tournament){
         return res.status(400).json({ error:"Match Already Exist at same time:\nCreate new match at different time!!!!"});
    }

   //to store user signup details to the datbase
      const match1=await MatchSchema.create({

      tournament_name:req.body.tournament_name,
      tournament_id:new mongoose.Types.ObjectId(req.body.tournament_id),
      teamA:req.body.teamA,
      teamB:req.body.teamB,
      teamA_id:new mongoose.Types.ObjectId(req.body.teamA_id) ,
      teamB_id:new mongoose.Types.ObjectId(req.body.teamB_id),
      match_date:req.body.match_date,
      match_time:req.body.match_time,
      venue:req.body.venue,
      createdBy: req.scorer._id,
  
      });
          const data={
            match:{

      tournament_name:match1.tournament_name,
      tournament_id:match1.tournament_id,
      teamA:match1.teamA,
      teamB:match1.teamB,
      teamA_id:match1.teamA_id,
      teamB_id:match1.teamB_id,
      match_date:match1.match_date,
      match_time:match1.match_time,
      venue:match1.venue,
            }
          }
      
      console.log(data.match);
        res.json({match:data.match , message:"Match Created Successfully"});
  
      }
  catch (err) {
      console.error("Match Create error:", err);
      return res.status(500).json({ error: "Internal Server Error or duplicate entry." });
    }
        
    
}

);

router.post('/getmatches',async (req,res)=>{

  const scorer_id=req.body.scorer_id;

if (!mongoose.Types.ObjectId.isValid(scorer_id)) {
  return res.status(400).json({ error: "Invalid scorer ID" });
}

  const formatedId=new mongoose.Types.ObjectId(scorer_id);
  // console.log("formatedid"+formatedId);

  try{ 
    const matches=await MatchSchema.find({ createdBy: formatedId });
    if(matches.lengh===0){
      return res.status(404).json({error:"There is no any Match Created"});
    }
    
    return res.json({data:matches ,message:"Matches Fetched Success"});
  }

  catch(error){
    return res.status(500).json({error:error, message:"Internal Server Error"});
  }



});

router.post('/deletematch',async (req, res)=>{

const { _id } = req.body;

  // Validate
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(422).json({ error: "Invalid Match ID format" });
  }

  try {
    // const objectId = new mongoose.Types.ObjectId(_id);

    // const match = await MatchSchema.findByIdAndDelete({objectId});
const match = await MatchSchema.findOneAndDelete({ _id: new mongoose.Types.ObjectId(_id) });
    if(!match){
   return res.status(404).json({ error: "Match not found" });
    }

    return  res.json({ success: true, message: "Match Deleted Successfully" });
  } catch (error) {
    console.error(" Match Delete error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
);

router.put('/update',async ( req,res)=>{
const match_id=req.body._id;

if (!mongoose.Types.ObjectId.isValid(match_id)) {
  return res.status(400).json({ error: "Invalid scorer ID" });
}


try{

  const fromatId=new mongoose.Types.ObjectId(match_id);
  
  const matchupdate=await MatchSchema.findByIdAndUpdate(fromatId,{ $set: req.body },{ new: true } );
  if(!matchupdate){
    return res.status(404).json({error:"No match found "});
  }
  return res.json({data:matchupdate ,message :"Match Updated Successfully"});
}
catch(error){
  return res.status(500).json({error:error ,message:"Interval Server Error"});
}

})

module.exports=router;
