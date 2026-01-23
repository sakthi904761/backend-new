import { Teacher } from "../models/teacherSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// Register/Create Teacher (by admin)
export const createTeacher = async (req, res, next) => {
  const { name, email, password, subject } = req.body;
  try {
    if (!name || !email || !password || !subject) {
      return handleValidationError("Please Fill Full Form!", 400);
    }

    // Check if teacher with this email already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Teacher with this email already exists!",
      });
    }

    // Create new teacher (password will be hashed by schema pre-save hook)
    const teacher = await Teacher.create({ name, email, password, subject });
    
    res.status(200).json({
      success: true,
      message: "Teacher Registered Successfully!",
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        subject: teacher.subject,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Teacher Login
export const loginTeacher = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return handleValidationError("Please provide email and password!", 400);
    }

    // Find teacher by email
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }

    // Compare password
    const isPasswordValid = await teacher.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }

    // Send successful response
    res.status(200).json({
      success: true,
      message: "Teacher Logged In Successfully!",
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        subject: teacher.subject,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get All Teachers
export const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().select('-password'); // Don't send passwords
    res.status(200).json({
      success: true,
      teachers,
    });
  } catch (err) {
    next(err);
  }
};

// Get Teacher by ID
export const getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id).select('-password');
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found!",
      });
    }
    res.status(200).json({
      success: true,
      teacher,
    });
  } catch (err) {
    next(err);
  }
};

// Update Teacher
export const updateTeacher = async (req, res, next) => {
  const { name, email, subject, password } = req.body;
  try {
    const updateData = { name, email, subject };
    if (password) {
      updateData.password = password;
    }

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher Updated Successfully!",
      teacher,
    });
  } catch (err) {
    next(err);
  }
};

// Delete Teacher
export const deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher Deleted Successfully!",
    });
  } catch (err) {
    next(err);
  }
};
  
 
