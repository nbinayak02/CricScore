const express=require('express');
const router=express.Router();
const TournamentSchema =require('../models/Tournment');
const {body,validationResult}=require('express-validator');

router.post('/tournament',
    
    async (req,res)=>{


        const { tournament_name }=req.body;
try{
    const Is_tournament=await TournamentSchema.findOne({ tournament_name });
    if(Is_tournament){
         return res.status(400).json({ error:"Tournament Already Exist:\nCreate new Tournament!!!!"});
    }

   //to store user signup details to the datbase
      const tournament1=await TournamentSchema.create({
      tournament_name:req.body.tournament_name,
      start_date:req.body.start_date,
      end_date:req.body.end_date,
      location:req.body.location,
      description:req.body.description
  
      });
          const data={
            tournament:{

                tournament_name:tournament1.tournament_name,
                start_date:tournament1.start_date,
                end_date:tournament1.end_date,
                location:tournament1.location,
                description:tournament1.description,
                date:tournament1.date
            }
          }
      
      console.log(data.tournament);
        res.json({touranment:data.tournament});
  
      }
  catch (err) {
      console.error("Tournament Create error:", err);
      return res.status(500).json({ error: "Internal Server Error or duplicate entry." });
    }
        
    
}

);

module.exports=router;
