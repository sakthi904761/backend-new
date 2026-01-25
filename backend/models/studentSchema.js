import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"],
    select: false, // Don't return password by default
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
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Hash password before saving
studentSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
studentSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


export const Student = mongoose.model('Student', studentSchema);



