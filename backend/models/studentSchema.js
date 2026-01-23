import mongoose from "mongoose";
import validator from "validator";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  class: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: ""
  },
  parentName: {
    type: String,
    default: ""
  },
  parentEmail: {
    type: String,
    default: ""
  },
  parentPhone: {
    type: String,
    default: ""
  }
});


export const Student = mongoose.model('Student', studentSchema);



