const { Schema, model } = require("mongoose");
const { randomBytes, createHmac } = require("crypto");
const { createJwtToken } = require("../services/token");

const scorerSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//hash the password before saving to db
scorerSchema.pre("save", function (next) {
  const user = this;

  //in case of updating other fields except password
  if (!user.isModified("password")) return;

  //random key to encrypt password with sha256
  const salt = randomBytes(16).toString(); 

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    //calling next middleware
    next();
});


    //match the password and create a token for auth
scorerSchema.static("matchPassAndGetToken", async function(email, password){
    
    const scorer = await this.findOne({email});
    if(!scorer) throw new Error("Scorer not Found");

    const salt = scorer.salt;
    const hashedPassword = scorer.password;

    //create hash of user provided password and match against stored password
    const userPassHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

    if(hashedPassword !== userPassHash){
        throw new Error("Password not matched");
    }

    //create jwt token
    const token = createJwtToken(scorer);
    return token;

});

const Scorer = model("scorer", scorerSchema);

module.exports = Scorer;
