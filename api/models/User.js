const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const schema = new Schema(
  {
    id: {
      type:String,
      require:true
    },
    email: {
      type:String,
      require:true
    },
    username: {
      type:String,
      require:true
    },
    password: {
      type:String,
      require:true
    },
    permission : {
      type:Boolean,
      require:true
    }
  },
  { versionKey: false,timestamps: true },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("users", schema);