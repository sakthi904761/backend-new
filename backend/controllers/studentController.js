import { Student } from "../models/studentSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createStudent = async (req, res, next) => {
  console.log(req.body);
  const { name, registrationNumber, class: studentClass, email, parentName, parentEmail, parentPhone } = req.body;
  try {
    if (!name || !registrationNumber || !studentClass) {
      return next("Please Fill Full Form!", 400);
    }
    await Student.create({ 
      name, 
      registrationNumber, 
      class: studentClass,
      email,
      parentName,
      parentEmail,
      parentPhone
    });
    res.status(200).json({
      success: true,
      message: "Student Created!",
    });   
  } catch (err) {
    next(err);
  } 
};

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      students,
    });   
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    const deletedStudent = await Student.findByIdAndDelete(id);
    
    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully!",
      student: deletedStudent,
    });   
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, registrationNumber, class: studentClass, email, parentName, parentEmail, parentPhone } = req.body;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    if (!name || !registrationNumber || !studentClass) {
      return res.status(400).json({
        success: false,
        message: "Please provide required fields: name, registrationNumber, class",
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name,
        registrationNumber,
        class: studentClass,
        email,
        parentName,
        parentEmail,
        parentPhone
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully!",
      student: updatedStudent,
    });   
  } catch (err) {
    next(err);
  }
};



