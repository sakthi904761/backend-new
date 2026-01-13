import { Class } from "../models/classSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createClass = async (req, res, next) => {
  console.log(req.body);
  const { grade } = req.body;
  try {
    if (!grade) {
      handleValidationError("Please Fill Form!", 400);
    }
    const created = await Class.create({ grade });
    res.status(201).json({
      success: true,
      message: "Class Created!",
      class: created,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.find();
    res.status(200).json({
      success: true,
      classes,
    });
  } catch (err) {
    next(err);
  }
};

export const updateClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { grade } = req.body;
    if (!grade) {
      handleValidationError("Please provide grade", 400);
    }
    const updated = await Class.findByIdAndUpdate(id, { grade }, { new: true });
    if (!updated) {
      handleValidationError("Class not found", 404);
    }
    res.status(200).json({ success: true, message: "Class updated", class: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`DELETE /api/v1/class/${id} requested`);
    const deleted = await Class.findByIdAndDelete(id);
    if (!deleted) {
      console.log(`Class ${id} not found`);
      handleValidationError("Class not found", 404);
    }
    console.log(`Class ${id} deleted`);
    res.status(200).json({ success: true, message: "Class deleted", class: deleted });
  } catch (err) {
    console.error('deleteClass error', err);
    next(err);
  }
};
 
