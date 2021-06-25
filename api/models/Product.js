const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const schema = new Schema(
  {
    id: {
      type:String,
      require:true
    },
    prodname: {
      type:String,
      require:true
    },
    calories: {
      type:Number,
      require:true
    },
    fat: {
      type:Number,
      require:true
    },
    carbs: {
      type:Number,
      require:true
    },
    protein : {
      type:Number,
      require:true
    }
  },
  { versionKey: false,timestamps: true },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("products", schema);