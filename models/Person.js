const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  mobile: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
});



const personModel = mongoose.model('Person', personSchema);
module.exports = personModel;