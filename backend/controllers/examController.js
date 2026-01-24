
import {Exam} from "../models/examSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const addExam = async (req, res, next) => {
  console.log(req.body);
  const { name, registrationNumber, className, marks } = req.body;
  try {
    if (!name || !registrationNumber || !className || !marks) {
        handleValidationError("Please fill out all fields!", 400);
    }
    await Exam.create({ name, registrationNumber, className, marks });
    res.status(200).json({
      success: true,
      message: "A new exam has been added!",
    });
  } catch (err) {
    next(err);
  }
};

export const getAllExams = async (req, res, next) => {
  try {
    const exams = await Exam.find();
    res.status(200).json({
      success: true,
      exams,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteExam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findByIdAndDelete(id);
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found!",
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Exam deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAllExams = async (req, res, next) => {
  try {
    const result = await Exam.deleteMany({});
    res.status(200).json({
      success: true,
      message: `${result.deletedCount} exam record(s) deleted successfully!`,
      deletedCount: result.deletedCount
    });
  } catch (err) {
    next(err);
  }
};
