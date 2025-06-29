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

module.exports=router;
