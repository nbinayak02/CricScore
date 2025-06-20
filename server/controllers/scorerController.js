const express = require("express");
const Scorer = require("../models/scorerModel");

async function handleScorerSignup(req, res) {
    try{
        const {fullName, email, password} = req.body;

        if(!fullName || !email || !password) {
            throw new Error("All input fields are required");
        }

        await Scorer.create({fullName, email, password});
        return res.status(201).json({message: "Scorer created successfully"});

    } catch( exception ){
        return res.status(422).json({message: "Exception Occured: "+exception});
    }
}

async function handleScorerLogin (req,res){

    try{
        const {email, password} = req.body;
        const scorerToken = await Scorer.matchPassAndGetToken(email, password);
        return res.cookie("token", scorerToken).status(200).json({message: "Login details matched"});
    } catch(exception){
        return res.status(401).json({message: "Failed to login. "+exception});
    }


}

module.exports = {
    handleScorerSignup,
    handleScorerLogin,
}