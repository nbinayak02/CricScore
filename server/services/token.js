require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET || "@#$Secret$#@";

function createJwtToken(scorer){

    const payload = {
        _id: scorer._id,
        email: scorer.email,
    };

    const token = jwt.sign(payload, secret);
    return token;
}

function validateJwtToken(token){
    const payload = jwt.verify(token, secret);
    return payload;
}

module.exports = {
    createJwtToken,
    validateJwtToken,
}