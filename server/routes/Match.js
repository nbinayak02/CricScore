const express=require('express');
const router=express.Router();
const MatchSchema =require("../Model/Match");
router.post('/match',
    
    async (req,res)=>{


        const { match_time }=req.body;
try{
    const Is_tournament=await MatchSchema.findOne({ match_time });
    if(Is_tournament){
         return res.status(400).json({ error:"Match Already Exist at same time:\nCreate new match at different time!!!!"});
    }

   //to store user signup details to the datbase
      const match1=await MatchSchema.create({
      tournament_name:req.body.tournament_name,
      teamA:req.body.teamA,
      teamB:req.body.teamB,
      match_date:req.body.match_date,
      match_time:req.body.match_time,
      venue:req.body.venue
  
      });
          const data={
            match:{

      tournament_name:match1.tournament_name,
      teamA:match1.teamA,
      teamB:match1.teamB,
      match_date:match1.match_date,
      match_time:match1.match_time,
      venue:match1.venue,
      date:match1.date
            }
          }
      
      console.log(data.match);
        res.json({match:data.match});
  
      }
  catch (err) {
      console.error("Match Create error:", err);
      return res.status(500).json({ error: "Internal Server Error or duplicate entry." });
    }
        
    
}

);

module.exports=router;
