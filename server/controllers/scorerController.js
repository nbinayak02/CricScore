const express = require("express");
const Scorer = require("../models/Scorer");
const { createJwtToken } = require("../services/token");
const bcrypt = require("bcrypt");

async function handleScorerSignup(req, res) {
  try {
    console.log(req.body);
    const { fullName, email, password } = req.body;
    const isScorer = await Scorer.findOne({email});

    if (!fullName || !email || !password) {
      throw new Error("All input fields are required");
    }

    if (isScorer) {
      throw new Error("Scorer already exists");
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    await Scorer.create({ fullName, email, password: hashedPass });
    return res.status(201).json({ message: "Scorer created successfully" });
  } catch (exception) {
    return res.status(422).json({ message: "Exception Occured: " + exception });
  }
}

async function handleScorerLogin(req, res) {
  try {
    const { email, password } = req.body;
    const scorer = await Scorer.findOne({ email });

    if (!scorer) throw new Error("Scorer doesn't exists");

    //compare password
    const matchPass = await bcrypt.compare(password, scorer.password);
    if (!matchPass) throw new Error("Password doesn't match");

    //if match then create token
    const token = createJwtToken(scorer);

    const user = {
      id:scorer._id,
      fullName:scorer.fullName,
      email:scorer.email,
    };

    return res
      .cookie("token", token)
      .status(200)
      .json({ message: "Login details matched", user });
  } catch (exception) {
    return res.status(401).json({ message: "Failed to login. " + exception });
  }
}

module.exports = {
  handleScorerSignup,
  handleScorerLogin,
};
